import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { BaseformComponent } from '../../baseform/baseform.component';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;

  constructor(/*app: AppComponent*/injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    //this.roles = this.app.roles; 
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', Validators.required],
      password: ['', this.valido.validatePassowrd(6, 30)],
      firstName: ['', this.valido.validateName(2, 30)],
      middleName: ['', this.valido.validateName(2, 30)],
      lastName: ['', this.valido.validateName(2, 30)],
      birthdate: ['', Validators.required],
      address: ['', Validators.required],
      roleId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', this.valido.validatePhone(true)],
      otherContacts: [''],
      deleted: ['', ''],
      loggedIn: []
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

    let newUser: User = this.addForm.value;
    let roleId = newUser['roleId'];
    delete newUser['roleId'];
    newUser.role = this.roles.find(r => r.id == roleId);
    this.api.createUser(newUser).subscribe(
      data => {
        let message = 'данните бяха записани';
        if (!data) {
          message = 'нещо се обърка..'
        }
        this.showSnack(message, '', 1500);
        history.back();
      }
    );
  }
}