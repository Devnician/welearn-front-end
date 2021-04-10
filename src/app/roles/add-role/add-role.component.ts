import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { MenuOptions } from 'src/app/model/menu.model';
import { Role } from 'src/app/model/role.model';
import { MenuUtil } from 'src/app/utils/menu-util';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent extends BlitcenComponent implements OnInit {
  addForm: FormGroup;
  displayedColumns = ['menu', 'add', 'edit', 'delete', 'preview', 'remove'];
  displayedColumnsAv = ['name', 'add'];
  allMenus: MenuOptions[] = [];
  selectedMenus: MenuOptions[] = [];
  menus: FormArray = this.formBuilder.array([]);
  availableMenus: FormArray = this.formBuilder.array([]);

  constructor(injector: Injector) {
    super(injector);
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

    this.allMenus = MenuUtil.getAllMenus();
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
      add: this.formBuilder.control(menu.add),
      edit: this.formBuilder.control(menu.edit),
      delete: this.formBuilder.control(menu.delete),
      preview: this.formBuilder.control(menu.preview)
    })
  }

  onSubmit() {
    let role: Role = this.addForm.getRawValue();
    delete role['available'];

    let permissions: any[] = [];

    role.menus.forEach(element => {
      let permission: any[] = [];
      permission[0] = element.key;
      permission[1] = element.add ? 1 : 0;
      permission[2] = element.edit ? 1 : 0;
      permission[3] = element.delete ? 1 : 0;
      if ((permission[1] + permission[2] + permission[3]) === 0) {
        permission[4] = 1; //voyeur
      } else {
        permission[4] = element.preview ? 1 : 0;
      }

      permissions.push(permission);
    });
    role.permissions = JSON.stringify(permissions);

    AppComponent.myapp.isUserAuthToFetch(this.apiRoles);
    this.apiRoles.saveRoleUsingPOST(this.addForm.value)

      .subscribe(data => {
        if (data) {
          this.showSnack('Информацията е добавена успешно', '', 1300);
        }
        this.goBack();
      });
  }
  /**
   * Remove all other marks if preview is selected 
   * @param menu 
   * @param checked 
   */
  previewSelected(menu: FormGroup, checked: boolean) {
    let opt: MenuOptions = menu.value;
    opt.add = opt.edit = opt.delete = !checked;
    opt.preview = checked;
    menu.patchValue(opt);
  }

  removePreviewCheck(menu: FormGroup) {
    let opt: MenuOptions = menu.value;
    opt.preview = false;
    menu.patchValue(opt);
  }
  goBack() {
    history.back();
  }
}
