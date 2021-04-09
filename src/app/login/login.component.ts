import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { UserDto } from '../../../libs/rest-client/src/model/userDto';
import { AppComponent } from '../app.component';
import { ApiService } from "../core/api.service";
import { Valido } from '../core/valido';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  invalidMessage: string;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private valido: Valido) {
  }

  ngOnInit() {
    AppComponent.myapp?.clearUserData();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });

    if (isDevMode()) {
      let whoIs: number = 1
        ;
      switch (whoIs) {
        case 1:
          this.loginForm.get('username').patchValue(environment.user);
          this.loginForm.get('password').patchValue(environment.pass);
          break;
        default:
          break;
      }
    }
  }

  onSubmit() {

    if (this.valido.isThereForbiddenWords(this.loginForm.get('username').value) ||
      this.valido.isThereForbiddenWords(this.loginForm.get('password').value)) {
      this.invalidLogin = true;
      this.invalidMessage = 'Използвате забранени думи.';
      return;
    }
    if (this.loginForm.invalid) {
      return;
    }


    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    //LOGIN
    //0 - admin 
    //1 - teacher
    //4 -student
    // let data: any = { message: "success" };
    // this.app.loadUsers();
    // data.result = this.app.users[0];

    this.apiService.login(loginPayload).subscribe(
      data => {

        console.log(data);
        if (data) {
          /**
           * Switches according message from result
           */
          switch (data.message) {
            case 'wrong_user':
              this.invalidLogin = true;
              this.invalidMessage = 'грешно потребителско име';
              return;
            case 'Wrong pass':
              this.invalidLogin = true;
              this.invalidMessage = 'грешна парола';
              return;
            case 'logged':
              this.invalidLogin = true;
              this.invalidMessage = 'някой е влязъл с този акаунт';
              return;
            case null:
              localStorage.setItem('user', data['token']);
              this.apiService.findUserById(data['id']).subscribe(
                data => {
                  let user: UserDto = data;
                  AppComponent.myapp.setUserAsLogged(user);
                  this.router.navigate(['home']);
                }
              );
              break;
            case 'deleted':
              this.invalidLogin = true;
              this.invalidMessage = 'вашия акаунт е изтрит';
              break;
          }
        }

        else {
          alert(data.message);
        };
      });
  }
}
