import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleDto } from 'libs/rest-client/src';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Role } from 'src/app/model/role.model';
import { TimeUtil } from 'src/app/utils/time-util';
import { UserDto } from '../../../../libs/rest-client/src/model/userDto';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent extends BlitcenComponent implements OnInit {
  editUser: UserDto;
  editForm: FormGroup;
  selfEdit = false;
  roles: Role[] = [];
  isEditMode = false;
  constructor(
    private donkey: DonkeyService,
    injector: Injector,
    private formBuilder: FormBuilder,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.selfEdit = this.donkey.getInfo() === 'self';
    this.editUser = this.donkey.getData();
    this.isEditMode = !(this.editUser === null || this.editUser === undefined);
    this.roles = AppComponent.myapp?.roles;
  }

  ngOnInit() {
    console.log(this.selfEdit);
    this.editForm = this.formBuilder.group({
      id: [],
      userId: [],
      username: ['', this.valido.validateUsername(true)],
      password: ['', this.valido.validatePassowrd(6, 30)],
      firstName: ['', this.valido.validateName(2, 30)],
      middleName: ['', this.valido.validateName(2, 30)],
      lastName: ['', this.valido.validateName(2, 30)],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', this.valido.validatePhone(true)],
      role: [this.isEditMode ? this.editUser.role : {}, Validators.required],
      deleted: ['', ''],
      loggedIn: [],
    });

    if (this.isEditMode) {
      this.editUser.password = 'unknown';
      this.editUser.birthdate = TimeUtil.adjustDate(this.editUser.birthdate);
      this.editForm.patchValue(this.editUser);
      if (this.selfEdit === true) {
        this.disableFormFields(this.editForm, [
          'username',
          'role',
          'birthdate',
        ]);
      }
    }
  }

  /**
   * Checks field
   * @param field the field
   * return True if it is valed false otherwise
   */
  isFieldValid(field: string) {
    // return true;
    return (
      !this.editForm?.get(field).valid && this.editForm?.get(field).touched
    );
  }

  compareRoles(option: RoleDto, value: RoleDto): boolean {
    return option.id === value.id;
  }
  /**
   *
   */
  onSubmit() {
    this.shouldIValidatePass();
    if (!this.editForm.valid) {
      this.valido.validateAllFormFields(this.editForm);
      return;
    }
    if (this.isEditMode) {
      const user: UserDto = this.editForm.getRawValue();
      if (user.password === 'unknown') {
        user.password = null;
      }

      this.apiUsers.updateUserUsingPUT(user).subscribe(() => {
        this.showSnack('Данните бяха променени', '', 1500);

        if (this.selfEdit === true) {
          this.router.navigate(['']);
          this.app.logout();
        } else {
          history.back();
        }
      });
    } else {
      const newUser: UserDto = this.editForm.value;
      this.apiUsers.saveUserUsingPOST(newUser).subscribe((data) => {
        let message = 'данните бяха записани';
        if (!data) {
          message = 'нещо се обърка..';
        }
        this.showSnack(message, '', 1500);
        history.back();
      });
    }
  }

  /**
   *
   * Check pass field for changes. If not changes the remove validators.
   */
  shouldIValidatePass() {
    const control = this.editForm.get('password');
    const pass: string = control?.value;
    if (pass === 'unknown' || pass === '') {
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }
}
