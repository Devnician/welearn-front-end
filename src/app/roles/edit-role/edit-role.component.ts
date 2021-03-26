import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { MenuOptions } from 'src/app/model/menu.model';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent extends BlitcenComponent implements OnInit {
  editForm: FormGroup;
  displayedColumns = ['menu', 'edit', 'delete', 'remove'];
  displayedColumnsAv = ['name', 'add'];
  currentRole: Role; // Edited role  

  allMenus: MenuOptions[] = [];
  selectedMenus: MenuOptions[] = [];
  menus: FormArray = this.formBuilder.array([]); // current role menus
  availableMenus: FormArray = this.formBuilder.array([]); // for asign

  statusesDirty: boolean = false;

  constructor(private donkey: DonkeyService, public snackBar: MatSnackBar, app: AppComponent) {
    super();
    this.currentRole = donkey.getData();

    if (this.currentRole.id === 2) {
      this.selectedMenus = AppComponent.collections.getTeacherMenus();
    } else if (this.currentRole.id === 3) {
      this.selectedMenus = AppComponent.collections.getTrainedMenus();
    }

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
    //  this.loadCurrentRoleMenus(this.currentRole.id);//+id); 
    // this.allMenus = AppComponent.collections.getAllMenus();
    console.log(this.currentRole);
    this.showSelectedMenus();
  }


  /**
   * Adds menu in selected
   * @param menu 
   */
  addMenu(menu: MenuOptions) {
    let foundOne = this.selectedMenus.find(elem => elem.key === menu.key);
    if (!foundOne) { // if is not present - add it
      this.selectedMenus.push(menu);
      this.allMenus = this.allMenus.filter(e => e.key !== menu.key);
      this.showAvailableMenus();
      this.showSelectedMenus();
    } else {
      this.showSnack("менюто вече е избрано", "", 1300);
    }
  }

  removeMenu(menu: MenuOptions) {
    this.selectedMenus = this.selectedMenus.filter(e => e.key != menu.key);
    this.allMenus.push(menu);
    this.showAvailableMenus();
    this.showSelectedMenus();
  }

  private showSelectedMenus() {
    if (this.editForm) {
      this.menus = this.formBuilder.array(this.selectedMenus.map(m => this.groupThis(m)));
      this.editForm.setControl('menus', this.menus);
    }
  }

  private showAvailableMenus() {
    if (this.editForm) {
      this.availableMenus = this.formBuilder.array(this.allMenus.map(m => this.groupThis(m)));
      this.editForm.setControl('available', this.availableMenus);
    }
  }

  private groupThis(menu: MenuOptions): FormGroup {
    return this.formBuilder.group({
      key: this.formBuilder.control(menu.key),
      value: this.formBuilder.control(menu.value),
      route: this.formBuilder.control(menu.route),
      matIcon: this.formBuilder.control(menu.matIcon),
      edit: this.formBuilder.control(menu.edit),
      delete: this.formBuilder.control(menu.delete),
    })
  }


  onSubmit() {
    let role: Role = this.editForm.getRawValue();
    delete role['available'];
    console.log(role.menus);

    role.menus.forEach(element => {
      delete element.matIcon;
      delete element.route;
      delete element.value;

    });


    console.log(JSON.stringify(role.menus));

    this.api.updateRole(role).subscribe(
      data => {
        if (data.status === 200) {
          history.back();
        } else {
          alert(data.message);
        }
      }
    );

    //this.showSnack("Not implemented yet.", "", 1500);
  }

  goBack() {
    history.back();
  }
}
