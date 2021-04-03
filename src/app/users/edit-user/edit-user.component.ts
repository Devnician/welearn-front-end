import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/internal/Subject';
import { AppComponent } from 'src/app/app.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Role } from 'src/app/model/role.model';
import { TimeUtil } from 'src/app/utils/time-util';
import { BaseformComponent } from '../../baseform/baseform.component';
import { User } from "../../model/user.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends BaseformComponent implements OnInit {

  private _destroyed$ = new Subject();
  editUser: User;
  editForm: FormGroup;
  parentDir: string = 'home/list-user';
  selfEdit: boolean = false;
  roles: Role[] = [];

  constructor(private dateAdapter: DateAdapter<Date>, private sanitizer: DomSanitizer, private donkey: DonkeyService) {
    super();
    const currentMenu = this.app.getCurrentMenuObject('/' + this.parentDir);
    this.selfEdit = donkey.getInfo() == 'self';
    this.editUser = donkey.getData();
    this.roles = AppComponent.myapp.roles;
  }

  ngOnInit() {
    if (!this.editUser.userId) {
      history.back();
    }
    this.editForm = this.formBuilder.group({
      userId: [],
      username: ['', Validators.required],
      password: ['', this.valido.validatePassowrd(6, 30)],
      firstName: ['', this.valido.validateName(2, 30)],
      middleName: ['', this.valido.validateName(2, 30)],
      lastName: ['', this.valido.validateName(2, 30)],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', this.valido.validatePhone(true)],
      deleted: ['', ''],
      loggedIn: []
    });

    this.editUser.password = 'unknown';
    this.editUser.birthdate = TimeUtil.adjustDate(this.editUser.birthdate);
    this.editForm.patchValue(this.editUser);
    if (this.selfEdit === true) {
      this.disableFormFields(this.editForm, ["username", "roleID",
        "birthdate",]);
    }
    this.editForm.setControl('roleID', new FormControl(this.editUser?.role.id));
  }

  /**
 * Checks field
 * @param field the field
 * return True if it is valed false otherwise
 */
  isFieldValid(field: string) {
    //return true;
    return !this.editForm.get(field).valid && this.editForm.get(field).touched;
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
    let user: User = this.editForm.getRawValue();
    let roleId = user['roleID'];
    delete user['roleID'];
    user.role = this.roles.find(r => r.id == roleId);

    if (user.password === 'unknown') {
      user.password = null;
    }

    this.api.updateUser(user).subscribe(
      data => {
        console.log(data);
        history.back();
      }
    );
  }

  /**
   * 
   * Check pass field for changes. If not changes the remove validators.
   */
  shouldIValidatePass() {
    const control = this.editForm.get('password');
    let pass: string = control.value;
    if (pass == 'unknown' || pass == '') {
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }


  public ngOnDestroy(): void {
    //  this.app.unblockEditedUserIfAny();
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}