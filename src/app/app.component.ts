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
import { Menu } from './model/menu.model';
import { Role } from './model/role.model';
import { User } from './model/user.model';
import { CollectionsUtil } from './utils/collections-util';

//registerLocaleData(localeEn);
registerLocaleData(localeBg);
const jwtHelper = new JwtHelperService();
//const { version: appVersion } = require('../../package.json');

export class MenuOptions {
  key: number
  value: string;
  route: string;
  matIcon: string;
}

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
  // @ViewChild(MatSidenav ) sidenav: MatSidenav;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  private interval: any;
  static myapp: AppComponent;
  static lang: string;
  user: User;
  isHeaderVisible: boolean;
  placeholder: string = 'breadcrumd';
  // users: User[] = [];
  roles: Role[] = [];
  events: string[] = []; // for sidenav
  opened: boolean;

  //   { key: 1, value: 'wl.menu_list_users', route: '/list-user', matIcon: 'supervised_user_circle' }, // added, func

  menuOptions: MenuOptions[] = [];
  menus: Menu[] = [];
  apiAlive: boolean = true;//"primary";
  subscription: Subscription;
  public breadcrumbs: IBreadCrumb[] = [];
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  static collections: CollectionsUtil = new CollectionsUtil();
  users: User[] = AppComponent.collections.getUsers();
  disciplines: Discipline[] = AppComponent.collections.getDisciplines();


  propsLoaded: boolean = false;
  static isMedia: boolean = false;
  serverOnline = true;
  usersMessage: string = '';
  constructor(public router: Router, private apiService: ApiService, private translate: TranslateService, public snackBar: MatSnackBar, private activatedRoute: ActivatedRoute, private donkey: DonkeyService) {
    AppComponent.myapp = this;
    translate.setDefaultLang('bg');
    AppComponent.lang = 'bg';



    if ("user" in localStorage) {
      // ('Welcome..');
    } else {
      this.clearUserData();
    }

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
          // ('Just going somewhere. Check user here');
        }
      }
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.determineIsMedia(event.target.innerWidth);

  }
  determineIsMedia(pixelWidth: any) {
    if (pixelWidth < 251) {
      AppComponent.isMedia = true;
    } else if (pixelWidth < 451) {
      AppComponent.isMedia = true;
    } else {
      AppComponent.isMedia = false;
    }
  }

  showApiStatus(arg0: boolean) {
    this.serverOnline = arg0;
  }

  loadUsers() {

    // this.apiService.getUsers().subscribe(data => {
    //   this.users = data.result;
    // });
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

  ngOnInit(): void {
    this.determineIsMedia(window.innerWidth);
    this.subsForRouterEvents();
    this.router.navigate(['']);
    //TODO - save me func place. read saved credentials from storage..
  }

  /**
   * Called after succesfull login
   */
  prepareTheCollections() {
    this.serverOnline = true;

    // this.interval = setInterval(() => {
    //   this.apiService.checkServer().subscribe(
    //     data => {
    //       if (data) {
    //         this.serverOnline = data.result;
    //       } else {
    //         this.serverOnline = false;
    //       }
    //     }
    //   );
    // }, 3000);


    this.loadUsers();
    this.loadRolesAndDetermineCurrentUserRole();
    this.loadMenus();

  }


  loadRolesAndDetermineCurrentUserRole() {
    this.roles = AppComponent.collections.getRoles();

    let role = this.roles.find(x => x.id === this.user.roleId);

    if (role) {
      this.user.role = role.role;
      this.user.roleBg = role.roleBg;
    }



    // this.apiService.getRoles().subscribe(data => {
    //   this.roles = data.result;
    //   let role = this.roles.find(x => x.id === this.user.roleId);

    //   if (role) {
    //     this.user.role = role.role;
    //     this.user.roleBg = role.roleBg;
    //   }
    // });
  }

  private loadMenus() {
    //get saved order
    let order: number[] = JSON.parse(localStorage.getItem('orderedMenus'));

    // let receivedMenus = [];
    // receivedMenus.push({ key: 0, value: 'wl.home', route: '/home', matIcon: 'home' });
    // receivedMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle' });
    // receivedMenus.push({ key: 2, value: 'wl.roles', route: '/home/list-role', matIcon: 'group' });
    // receivedMenus.push({ key: 3, value: 'wl.events', route: '/home/list-event', matIcon: 'event_note' });

    if (this.user.roleId == 1) {
      this.menuOptions = AppComponent.collections.getAdminMenus();
    } else if (this.user.roleId == 2) {
      this.menuOptions = AppComponent.collections.getTeacherMenus();
    } else {
      this.menuOptions = AppComponent.collections.getTrainedMenus();
    }




    // this.apiService.getMenusForRole(this.user.roleId).subscribe(
    //   data => {
    //     this.menus = data.result;
    //     let receivedMenus = [];
    //     receivedMenus.push({ key: 0, value: 'wl.home', route: '/home', matIcon: 'home' });
    //     for (const menu of this.menus) {
    //       receivedMenus.push({ key: menu.menuId, value: 'wl.' + menu.menu, route: menu.route, matIcon: menu.icon });
    //     }

    //     if (order) { // order it 
    //       let addedLater = [];
    //       order.forEach(element => {
    //         let toBeRemoved: number;
    //         for (let index = 0; index < receivedMenus.length; index++) {
    //           const foundOne = receivedMenus[index];
    //           if (element === foundOne['key']) {
    //             this.menuOptions.push(foundOne);
    //             toBeRemoved = element;
    //             break;
    //           }
    //         }
    //         receivedMenus = receivedMenus.filter(e => e['key'] !== toBeRemoved);
    //       });
    //       if (receivedMenus.length > 0) { // if menus are more than saved, add it on bottom            
    //         receivedMenus.forEach(r => { this.menuOptions.push(r) });
    //       }
    //       this.saveOrderOfMenus();
    //     } else { //show them as they arrived
    //       this.menuOptions = receivedMenus;
    //     } 

    //   }
    // );
  }



  /**
   * Before close tab catcher..When tab was closed clear all data here...
   * @param event 
   * 
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    // event.returnValue = 'You sure you want to leave?'
    // this.method();
  }

  // async method() {
  //   if (this.user) {
  //     var x = await this.apiService.syncUserLogout(this.user.id).then(a => a.message);
  //   }


  // }
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

  /**
  * Clear after user and mark as logged out. Redirect to login page.
  */
  logout(): void {
    clearInterval(this.interval);
    try {
      if (this.user) {
        this.apiService.logout(this.user.id)
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

    this.propsLoaded = false;
    this.menuOptions = [];
    this.menus = [];
    this.opened = false;
    this.isHeaderVisible = false;

    localStorage.removeItem('user');
    delete this.user;
  }

  /**
   * Gets menu according the url parameter
   * @param url 
   */
  getCurrentMenuObject(url: string): Menu {
    return this.menus.find(menu => menu.route === url);
  }


  /**
   * rearrange menus
   * @param event 
   */
  drop(event: CdkDragDrop<Menu[]>) {
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


  /**
   * Gets stamp with first and lst name for user if it is present in list
   * @param userId 
   */
  getUserStamp(userId: number, atachOfficeName: boolean) {
    try {
      let user: User = this.users.find(u => u.id === userId);
      if (user) {

        // if (atachOfficeName === true) {
        //   let off: Office = this.offices.find(of => of.id === user.officeId);
        //   if (off) {
        //     return user.firstName + ' ' + user.lastName + '/' + off.name;
        //   }
        // } else {
        //   return user.firstName + ' ' + user.lastName;
        // }
        return user.firstName + ' ' + user.lastName;
      }
      return '';
    } catch (error) {
      return 'not found';
    }
  }



  /**
   * Gets user obj if it is present in list
   * @param userId 
   */
  getUserObject(userId: number) {
    console.log(this.users);
    try {
      return this.users.find(u => u.id === userId);
    } catch (error) {
      return undefined;
    }
  }
  editMyAccount() {
    this.donkey.setData(this.user);//this.getUserObject(this.user.id));
    this.donkey.setInfo("self");   
    this.router.navigate(['home/list-user/edit-user']);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

