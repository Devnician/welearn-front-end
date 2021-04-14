import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationControllerService, UserControllerService } from 'libs/rest-client/src';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Valido } from '../core/valido';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  invalidMessage: string;

  constructor(private authService: AuthenticationControllerService, private apiUser: UserControllerService, private formBuilder: FormBuilder, private router: Router, private valido: Valido,) {
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

    AppComponent.myapp.isUserAuthToFetch(this.authService);
    this.authService.registerUsingPOST(loginPayload).subscribe(
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

              let map: { [key: string]: string } = {};
              map["Authorization"] = "Bearer " + data['token'];
              this.apiUser.configuration.apiKeys = map;


              //               let configParams: ConfigurationParameters = {};
              // let map: { [key: string]: string } = {};
              // //  let token = localStorage.getItem('user');
              // map["Bearer"] = data['token'];

              //  configParams.apiKeys = map;// {"Bearer":token};
              //  let configuration: Configuration = new Configuration(configParams);
              // // configuration.basePath = environment.restUrl.slice(0, -1);
              //  configuration.apiKeys["Authorization"] = token;
              // // this.roleApi.configuration = configuration;
              // // this.roleApi.configuration.apiKeys = map; 

              this.apiUser.getUserUsingGET(data['id']).subscribe(
                result => {
                  let user: User = result as User;
                  user.token = data['token'];
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
