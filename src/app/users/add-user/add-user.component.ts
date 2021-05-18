import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../../../../libs/rest-client/src/model/userDto';
import { BaseformComponent } from '../../baseform/baseform.component';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', this.valido.validateUsername(true)],
      password: ['', this.valido.validatePassowrd(6, 30)],
      firstName: ['', this.valido.validateName(2, 30)],
      middleName: ['', this.valido.validateName(2, 30)],
      lastName: ['', this.valido.validateName(2, 30)],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      role: [{}, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', this.valido.validatePhone(true)],
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
    let newUser: UserDto = this.addForm.value;
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
