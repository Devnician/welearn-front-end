import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { MenuOptions } from 'src/app/model/menu.model';
import { Role } from 'src/app/model/role.model';
import { MenuUtil } from 'src/app/utils/menu-util';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent extends BlitcenComponent implements OnInit {
  editForm: FormGroup;
  displayedColumns = ['menu', 'add', 'edit', 'delete', 'preview', 'remove'];
  displayedColumnsAv = ['name', 'add'];
  currentRole: Role;
  allMenus: MenuOptions[] = [];
  selectedMenus: MenuOptions[] = [];
  menus: FormArray = this.formBuilder.array([]); // current role menus
  availableMenus: FormArray = this.formBuilder.array([]); // for asign 

  constructor(private donkey: DonkeyService, public snackBar: MatSnackBar, injector: Injector) {
    super(injector);
    this.currentRole = donkey.getData();
    try {
      this.allMenus = MenuUtil.getAllMenus();
      MenuUtil.determineSelectedMenusForThisRole(this.currentRole, this.selectedMenus, this.allMenus);
    } catch (error) {
      this.showSnack('Тази роля няма избрани менюта', '', 1300);
      this.selectedMenus = [];
    }
  }

  ngOnInit() {
    /**
     * Build form with base fields
     */
    if (this.currentRole) {
      this.editForm = this.formBuilder.group({
        id: [this.currentRole.id, ''],
        role: [this.currentRole.role, Validators.required],
        description: [this.currentRole.description, Validators.required],
        roleBg: [this.currentRole.roleBg, Validators.required],
        descriptionBg: [this.currentRole.descriptionBg, Validators.required],
        menus: this.menus,
        available: this.availableMenus,
      });
      this.showSelectedMenus();
      this.showAvailableMenus();
    } else {
      this.editForm = this.formBuilder.group({
        id: '',
        role: '',
        description: '',
        roleBg: '',
        descriptionBg: '',
        menus: [],
        available: [],
      });
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
      //Bugfix : MSE20-53 
      let tempMenus: MenuOptions[] = [];
      this.allMenus.forEach(menu => {
        if (!this.selectedMenus.find(m => m.key === menu.key)) {
          tempMenus.push(menu);
        }
      });
      this.allMenus = tempMenus;
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
      add: this.formBuilder.control(menu.add),
      edit: this.formBuilder.control(menu.edit),
      delete: this.formBuilder.control(menu.delete),
      preview: this.formBuilder.control(menu.preview)
    })
  }


  onSubmit() {
    let role: Role = this.editForm.getRawValue();
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
    this.apiRoles.updateRoleUsingPUT(role).subscribe(
      data => {
        if (data) {
          this.showSnack("Данните бяха запазени", "", 1500);
          history.back();
        } else {
          alert("Missing data");
        }
      }
    );
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
