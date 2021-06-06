import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationControllerService,
  UserControllerService,
} from 'libs/rest-client/src';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Valido } from '../core/valido';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin = false;
  invalidMessage: string;

  constructor(
    private authService: AuthenticationControllerService,
    private apiUser: UserControllerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private valido: Valido
  ) {}

  ngOnInit() {
    AppComponent.myapp?.clearUserData();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });

    if (isDevMode()) {
      this.loginForm.get('username').patchValue(environment.user);
      this.loginForm.get('password').patchValue(environment.pass);
    }
  }

  onSubmit() {
    if (
      this.valido.isThereForbiddenWords(this.loginForm.get('username').value) ||
      this.valido.isThereForbiddenWords(this.loginForm.get('password').value)
    ) {
      this.invalidLogin = true;
      this.invalidMessage = 'Използвате забранени думи.';
      return;
    }

    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };

    AppComponent.myapp.isUserAuthToFetch(this.authService);

    this.authService.registerUsingPOST(loginPayload).subscribe((data) => {
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
            const map: { [key: string]: string } = {};
            map.Authorization = 'Bearer ' + data.token;
            this.apiUser.configuration.apiKeys = map;

            this.apiUser.getUserUsingGET(data.id).subscribe((result) => {
              const user: User = result as User;
              user.token = data.token;
              AppComponent.myapp.setUserAsLogged(user);
              this.router.navigate(['home']);
            });
            break;
          case 'deleted':
            this.invalidLogin = true;
            this.invalidMessage = 'вашия акаунт е изтрит';
            break;
        }
      } else {
        alert(data.message);
      }
    });
  }
}
