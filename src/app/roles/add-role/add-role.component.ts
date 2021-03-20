import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { MenuOptions } from 'src/app/model/menu.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent extends BlitcenComponent implements OnInit {

  allMenus: MenuOptions[] = [];
  selectedMenus: MenuOptions[] = [];

  menus: FormArray = this.formBuilder.array([]);
  availableMenus: FormArray = this.formBuilder.array([]);

  displayedColumns = ['menu', 'edit', /*'remove',*/ 'delete'];
  displayedColumnsAv = ['name', 'add'];
  constructor() {
    super();
  }

  addForm: FormGroup;

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
    this.loadAllAvailableMenus();
    console.log(this.allMenus);
  }

  loadAllAvailableMenus() {
    this.availableMenus = this.formBuilder.array(this.allMenus.map(_menu => this.formBuilder.group({
      // name: this.formBuilder.control(_menu.value),//for api
      key: this.formBuilder.control(_menu.key),
      value: this.formBuilder.control(_menu.value),
      route: this.formBuilder.control(_menu.route),
      icon: this.formBuilder.control(_menu.matIcon),
      edit: this.formBuilder.control(_menu.edit),

    })));

    if (this.addForm) {
      this.addForm.setControl('available', this.availableMenus);
    }

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
      //TODO -remove control form available manus array

      this.showSelectedMenus();
    } else {
      this.showSnack("менюто вече е избрано", "", 1300);
    }
  }

  removeMenu(menu: MenuOptions) {
    // console.log(menu);
    // return;

    this.selectedMenus = this.selectedMenus.filter(e => e.key !== menu.key);
    this.allMenus.push(menu);

    this.availableMenus.push(this.formBuilder.group({
      // name: this.formBuilder.control(_menu.value),//for api
      key: this.formBuilder.control(menu.key),
      value: this.formBuilder.control(menu.value),
      route: this.formBuilder.control(menu.route),
      icon: this.formBuilder.control(menu.matIcon),
      edit: this.formBuilder.control(menu.edit),
    }))



    this.addForm.get('menus').patchValue(this.allMenus);

    this.showSelectedMenus();
  }

  private showSelectedMenus() {
    this.menus.clear();
    this.menus = this.formBuilder.array(
      this.selectedMenus.map(
        _menu => this.formBuilder.group({
          key: this.formBuilder.control(_menu.key),
          value: this.formBuilder.control(_menu.value),
          route: this.formBuilder.control(_menu.route),
          icon: this.formBuilder.control(_menu.matIcon),
          edit: this.formBuilder.control(_menu.edit),
        })
      )
    );
    this.addForm.setControl('menus', this.menus);
  }

  // private showAvailableMenus() {
  //   this.availableMenus.clear();
  //   this.availableMenus = this.formBuilder.array(
  //     this.allMenus.map(
  //       _menu => this.formBuilder.group({
  //         key: this.formBuilder.control(_menu.key),
  //         value: this.formBuilder.control(_menu.value),
  //         route: this.formBuilder.control(_menu.route),
  //         icon: this.formBuilder.control(_menu.matIcon),
  //         edit: this.formBuilder.control(_menu.edit),
  //       })
  //     )
  //   );
  //   this.addForm.setControl('available', this.menus);
  // }
  onSubmit() {
    // this.api.createRole(this.addForm.value)
    //   .subscribe(data => {
    //     this.router.navigate(['home/list-role']);
    //   });
  }
}
