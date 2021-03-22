import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { MenuOptions } from 'src/app/model/menu.model';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent extends BlitcenComponent implements OnInit {
  addForm: FormGroup;
  displayedColumns = ['menu', 'edit', 'delete', 'remove'];
  displayedColumnsAv = ['name', 'add'];
  allMenus: MenuOptions[] = [];
  selectedMenus: MenuOptions[] = [];
  menus: FormArray = this.formBuilder.array([]);
  availableMenus: FormArray = this.formBuilder.array([]);

  constructor() {
    super();
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      role: ['', Validators.required],
      description: ['', Validators.required],
      roleBg: ['', Validators.required],
      descriptionBg: ['', Validators.required],
      menus: this.menus,
      available: this.availableMenus,
    });

    this.allMenus = AppComponent.collections.getAllMenus();
    this.showAvailableMenus();
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
    if (this.addForm) {
      this.menus = this.formBuilder.array(this.selectedMenus.map(m => this.groupThis(m)));
      this.addForm.setControl('menus', this.menus);
    }
  }

  private showAvailableMenus() {
    if (this.addForm) {
      this.availableMenus = this.formBuilder.array(this.allMenus.map(m => this.groupThis(m)));
      this.addForm.setControl('available', this.availableMenus);
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
    let role: Role = this.addForm.getRawValue();
    delete role['available'];
    console.log(role);
    this.showSnack("Not implemented yet.", "", 1500);
    // this.api.createRole(this.addForm.value)
    //   .subscribe(data => {
    //     this.router.navigate(['home/list-role']);
    //   });
  }

  goBack() {
    history.back();
  }
}
