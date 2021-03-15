import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Menu } from 'src/app/model/menu.model';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent extends BlitcenComponent implements OnInit {
  editForm: FormGroup;
  displayedColumns = ['menu', 'preview', 'edit', 'remove', 'all_regions', 'all_tickets', 'assign_to_all', 'statuses', 'delete'];
  displayedColumnsAv = ['name', 'add'];
  currentRole: Role; // Edited role  
  allMenus: Menu[] = []; // all menus
  menus: FormArray = this.formBuilder.array([]); // current role menus
  availableMenus: FormArray = this.formBuilder.array([]); // for asign

  statusesDirty: boolean = false;

  constructor(private donkey: DonkeyService, public snackBar: MatSnackBar) {
    super();
    this.currentRole = donkey.getData();
  }

  ngOnInit() {
    /**
     * Build form with base fields
     */
    this.editForm = this.formBuilder.group({
      id: [this.currentRole.id, ''],
      role: [this.currentRole.role, Validators.required],
      description: [this.currentRole.description, Validators.required],
      roleBg: [this.currentRole.roleBg, Validators.required],
      descriptionBg: [this.currentRole.descriptionBg, Validators.required],
      menus: this.menus,
      available: this.availableMenus,
    });

    this.loadCurrentRoleMenus(this.currentRole.id);//+id);
    //this.loadAllAvailableMenus();
  }
  /**
   * Process On list with ticket statuses change event
   * @param event 
   */
  onChange(event: any) {
    // this.statusesDirty = true;
    // this.canUseStatuses = event.value;
    // let ticketMenu: Menu = this.currentRole.menus.find(m => m.menu == 'menu_tickets');
    // if (ticketMenu != undefined) {
    //   ticketMenu.ticketStatuses.forEach(element => {
    //     let temp: any = this.canUseStatuses.find(e => e.id === element.id);
    //     element.canUse = temp === undefined ? false : true;
    //   });
    // }
  }

  loadCurrentRoleMenus(id: number) {
    // this.api.getMenusForRole(+id).subscribe(
    //   (data: { result: Menu[]; }) => {
    //     this.currentRole.menus = data.result;
    //     let ticketMenu: Menu = this.currentRole.menus.find(m => m.menu == 'menu_tickets');
    //     if (ticketMenu != undefined) {
    //       // ticketMenu.ticketStatuses.forEach(element => {
    //       //   if (element.canUse == true) {
    //       //     this.canUseStatuses.push(element);
    //       //   }
    //       // });
    //     }
    //     this.showCurrentRoleMenus();
    //   });
  }

  // loadAllAvailableMenus() {
  //   return this.api.getMenus().subscribe(
  //     data => {
  //       this.allMenus = data.result;
  //       this.refreshAvailableMenus();
  //     }
  //   );
  // }

  refreshAvailableMenus() {
    let available: Menu[] = [];
    for (let index = 0; index < this.allMenus.length; index++) {
      const element = this.allMenus[index];
      if (element) {
        let foundOne = this.currentRole.menus.find(elem => elem.menuId === element.id);
        if (!foundOne) {
          available.push(element);
        }
      }
    }

    this.availableMenus = this.formBuilder.array(available.map(_menu => this.formBuilder.group({
      name: this.formBuilder.control(_menu.name),//for api
    })));

    if (this.editForm) {
      this.editForm.setControl('available', this.availableMenus);
    }

  }


  /**
   * fills in the left table with menus for this role. Attaches control(formArray) to form.
   */
  showCurrentRoleMenus() {
    this.menus.clear();
    this.menus = this.formBuilder.array(
      this.currentRole.menus.map(
        _menu => this.formBuilder.group({
          id: this.formBuilder.control(_menu.id),
          roleId: this.formBuilder.control(_menu.roleId),//for api
          menuId: this.formBuilder.control(_menu.menuId),//for api
          menu: this.formBuilder.control(_menu.menu),
          preview: this.formBuilder.control(_menu.preview),
          edit: this.formBuilder.control(_menu.edit),
          remove: this.formBuilder.control(_menu.remove),


        })
      )
    );
    this.editForm.setControl('menus', this.menus);
  }

  /**
   * 
   * @param menu Control
   */
  removeMenu(menu: any) {
    let menus: Menu[] = this.currentRole.menus;
    let index = menus.findIndex(me => me.menuId == menu.value.menuId);
    menus[index] = undefined;

    let copy: Menu[] = [];
    for (let i = 0; i < menus.length; i++) {
      const element = menus[i];
      if (element) {
        copy.push(element);
      }
    }
    this.currentRole.menus = copy;
    this.editForm.get('menus').patchValue(this.currentRole.menus);

    this.showChanges();
  }
  /**
   * 
   * @param menu the control of menu
   */
  addMenu(menu: any) {
    let menuName: string = menu['value']['name'];//get name from control
    // find by name in all
    let found: Menu = this.allMenus.find(men => men.name === menuName);
    if (found) {
      let m: Menu = new Menu();
      m.id = 0; // will be set later
      m.roleId = this.currentRole.id; // current role
      m.menuId = found.id;// from menu obj
      m.menu = found.name;
      m.preview = 1;
      m.edit = 0;
      m.remove = 0;

      m.route = found.route;
      m.icon = found.icon;

      let foundOne = this.currentRole.menus.find(elem => elem.menuId === m.menuId);
      if (!foundOne) { // if was not present - add it
        this.currentRole.menus.push(m);
      }

      this.showChanges();

    } else {
      console.log('add menu failed.')
    }
  }
  showChanges() {
    this.showCurrentRoleMenus();
    this.refreshAvailableMenus();
    this.editForm.markAsDirty({ onlySelf: true });
  }

  onSubmit() {

    // if (this.editForm.dirty || this.statusesDirty) {
    //   let updatedRole: Role = this.editForm.value;
    //   updatedRole.menus.forEach(element => {
    //     element.remove = +element.remove;
    //     element.preview = +element.preview;
    //     element.edit = +element.edit;
    //     element.allRegion = +element.allRegion;
    //     element.allTickets = +element.allTickets;
    //     element.assignToAll = +element.assignToAll;

    //     if (element.remove === 0 && element.preview === 0 && element.edit === 0) {
    //       element.preview = 1;
    //     }
    //   });
    //   console.log(updatedRole);

    //   this.api.updateRole(updatedRole)
    //     // .pipe(first())
    //     .subscribe(
    //       data => {
    //         if (data.status === 200) {

    //           this.app.loadRolesAndDetermineCurrentUserRole();

    //           let shackRef = this.snackBar.open("Role was saved", "ok", {
    //             duration: 3000,
    //           });
    //           shackRef.afterDismissed().subscribe(() => {
    //             this.goBack();
    //           });
    //         } else {
    //           alert(data.message);
    //         }
    //       },
    //       error => {
    //         alert('2 ' + error);
    //       });

    // } else {

    //   this.goBack();
    // }
  }

  goBack() {
    this.router.navigate(['home/list-role']);
  }
}
