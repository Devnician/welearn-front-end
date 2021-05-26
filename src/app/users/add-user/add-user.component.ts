import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { Valido } from 'src/app/core/valido';
import { UserDto } from '../../../../libs/rest-client/src/model/userDto';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends BlitcenComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private v: Valido,
    private s: MatSnackBar
  ) {
    super(injector, s);
  }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', this.v.validateUsername(true)],
      password: ['', this.v.validatePassowrd(6, 30)],
      firstName: ['', this.v.validateName(2, 30)],
      middleName: ['', this.v.validateName(2, 30)],
      lastName: ['', this.v.validateName(2, 30)],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      role: [{}, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', this.v.validatePhone(true)],
      otherContacts: [''],
      deleted: ['', ''],
      loggedIn: [],
    });
  }

  /**
   * Checks field
   * @param field the field
   * return True if it is valed false otherwise
   */
  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && this.addForm.get(field).touched;
  }

  /**
   * Clear form
   */
  reset() {
    this.addForm.reset();
  }

  /**
   * Submit form if is valid
   */
  onSubmit() {
    if (!this.addForm.valid) {
      this.valido.validateAllFormFields(this.addForm);
      return;
    }
    const newUser: UserDto = this.addForm.value;
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
