import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg'; // to register bg
import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from './core/api.service';
import { DonkeyService } from './core/donkey.service';
import { Discipline } from './model/discipline.model';
import { MenuOptions } from './model/menu.model';
import { Role } from './model/role.model';
import { User } from './model/user.model';
import { MenuUtil } from './utils/menu-util';
//registerLocaleData(localeEn);
registerLocaleData(localeBg);
const jwtHelper = new JwtHelperService();

export interface IBreadCrumb {
  label: string;
  url: string;
  enabled: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  version: string = '1.0.00';
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  static myapp: AppComponent;
  static lang: string;
  static isMedia: boolean = false;
  private interval: any;
  user: User;
  isHeaderVisible: boolean;
  roles: Role[] = [];
  events: string[] = []; // for sidenav
  opened: boolean;
  menuOptions: MenuOptions[] = [];
  subscription: Subscription;
  public breadcrumbs: IBreadCrumb[] = [];

  //users: User[] = [];
  disciplines: Discipline[] = [];
  serverOnline = true;

  constructor(public router: Router, private apiService: ApiService, private translate: TranslateService, public snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private donkey: DonkeyService) {
    AppComponent.myapp = this;
    translate.setDefaultLang('bg');
    AppComponent.lang = 'bg';

    this.clearUserData();

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        /**
         * This property(router.navigated) is false when the router starts and
         *  after the first navigation it changes to true. And that’s it.        
         */
        let browserRefresh = !router.navigated;
        //TODO HERE UNLOCK ALL
        if (browserRefresh) {
          this.clearUserData();
        } else {
          // ('Just going somewhere. Check user here..');
        }
      }
    });
  }

  ngOnInit(): void {
    this.determineIsMedia(window.innerWidth);
    this.subsForRouterEvents();

    //this.fetchDisciplines();
    this.router.navigate(['']);
    //TODO - save me func place. read saved credentials from storage..
  }



  showApiStatus(arg0: boolean) {
    this.serverOnline = arg0;
  }

  /**
   * Change language
   * @param language 
   */
  useLanguage(language: string) {
    console.log(language)
    this.opened = false;
    this.translate.use(language);
    AppComponent.lang = language;
  }

  fetchDisciplines() {
    //TODO - API CALL
    //this.disciplines = AppComponent.collections.getDisciplines();
    this.apiService.findAllDisciplines().subscribe(data => {
      this.disciplines = data.result;
    });

  }

  /**
   * callback after succesfull login
   */
  setUserAsLogged(user: User) {
    this.isHeaderVisible = true;
    this.user = user;
    this.serverOnline = true;
    this.buildMenuForThisRole(this.user.role);
    this.findAllRoles();
  }

  /**
   * Fetch all roles for checking for logged user role.
   */
  findAllRoles() {
    this.apiService.getRoles().subscribe(data => {
      this.roles = data.result;
      console.log(this.roles);
    });
  }
  /**
   * Builds menus according Role. If there is a saved order in the local storage - arranges the menus.
   * @param role 
   */
  private buildMenuForThisRole(role: Role) {
    let unorderedMenus: MenuOptions[] = [];
    let all: MenuOptions[] = MenuUtil.getAllMenus();
    MenuUtil.determineSelectedMenusForThisRole(role, unorderedMenus, all);

    //get saved order if any
    let order: number[] = JSON.parse(localStorage.getItem('orderedMenus'));
    if (order) { // order it 
      order.forEach(element => {
        let toBeRemoved: number;
        for (let index = 0; index < unorderedMenus.length; index++) {
          const foundOne = unorderedMenus[index];
          if (element === foundOne['key']) {
            this.menuOptions.push(foundOne);
            toBeRemoved = element;
            break;
          }
        }
        unorderedMenus = unorderedMenus.filter(e => e['key'] !== toBeRemoved);
      });
      if (unorderedMenus.length > 0) { // if menus are more than saved, add it on bottom            
        unorderedMenus.forEach(r => { this.menuOptions.push(r) });
      }
      this.saveOrderOfMenus();
    } else { //show them as they arrived
      this.menuOptions = unorderedMenus;
    }
  }

  /**
   * Before close tab or restart in devMode -  marks user as loged out and clears his local data.
   * @param event 
   * 
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    this.logout();
  }

  /**
   * 
   * @param event On back press
   */
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    ;
    switch (this.router.url) {
      case '/home':
        this.logout();
        this.snackBar.open("Bye-bye!", "", {
          duration: 3000,
        });
        break;
      default:
        break;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.determineIsMedia(event.target.innerWidth);
  }

  determineIsMedia(pixelWidth: any) {
    if (pixelWidth < 451) {
      AppComponent.isMedia = true;
    } else {
      AppComponent.isMedia = false;
    }
  }

  /**
  * Clear after user and mark as logged out. Redirect to login page.
  */
  logout(): void {
    clearInterval(this.interval);
    try {
      if (this.user) {
        this.apiService.logout(this.user.userId)
          .subscribe(data => {
            let d = data;
            this.clearUserData();
          });
      }
    } catch (error) {
      this.clearUserData();
    }
    this.router.navigate(['']);
  }

  /**
   
  /**
   * Clears data, hides menu and header
   */
  clearUserData() {
    this.menuOptions = [];
    this.opened = false;
    this.isHeaderVisible = false;
    localStorage.removeItem('user');
    delete this.user;
  }

  /**
   * Gets menu according the url parameter
   * @param url 
   */
  getCurrentMenuObject(url: string): MenuOptions {
    return this.menuOptions.find(menu => menu.route === url);
  }


  /**
   * rearrange menus
   * @param event 
   */
  drop(event: CdkDragDrop<MenuOptions[]>) {
    moveItemInArray(this.menuOptions, event.previousIndex, event.currentIndex);
    this.saveOrderOfMenus();
  }
  /**
   * Saves order of menus in local storage
   */
  saveOrderOfMenus() {
    let order: number[] = [];
    this.menuOptions.forEach(element => {
      order.push(element.key as number);
    });
    localStorage.setItem('orderedMenus', JSON.stringify(order));
  }
  /**
   * Gets translated string according arg as key
   * @param arg 
   */
  getTranslation(arg: string): string {
    return this.translate.instant(arg);
  }
  //BREADCRUMB METHODS

  subsForRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator        
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator        
        delete this.breadcrumbs;
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        let len: number = this.breadcrumbs.length;
        if (len > 0) {
          this.breadcrumbs[len - 1].enabled = false;
        }
      }

      if (event instanceof NavigationError) {
        alert(event.error);
      }
    });
  }


  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
      enabled: true,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }


  editMyAccount() {
    this.donkey.setData(this.user);
    this.donkey.setInfo("self");
    this.router.navigate(['home/list-user/edit-user']);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);

    this.logout();
  }
}

