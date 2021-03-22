import { Component, isDevMode, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { ApiService } from "../core/api.service";
import { AppInjector } from '../core/app-injector.servise';
import { Valido } from '../core/valido';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  protected apiService: ApiService;
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  invalidMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private app: AppComponent, private valido: Valido) {
  }

  ngOnInit() {
    this.app.clearUserData();
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
    const injector = AppInjector.getInjector();
    this.apiService = injector.get(ApiService);
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
    let data: any = { message: "success" };
    this.app.loadUsers();
    data.result = this.app.users[0];

    //  this.apiService.login(loginPayload).subscribe(data => {

    //   if (data.status === 200) {
    /**
     * Switch for login result
     */
    switch (data.message) {
      case 'wrong_user':
        this.invalidLogin = true;
        this.invalidMessage = 'грешно потребителско име';
        return;
      case 'wrong_pass':
        this.invalidLogin = true;
        this.invalidMessage = 'грешна парола';
        return;
      case 'logged':
        this.invalidLogin = true;
        this.invalidMessage = 'някой е влязъл с този акаунт';
        return;

      case 'success':
        let user: User = new User();
        user.username = loginPayload.username;
        user.roleId = data.result.roleId;
        user.id = data.result.id;
        localStorage.setItem('user', data.result.token);
        user.firstName = data.result.firstName;
        user.lastName = data.result.lastName;
        this.app.isHeaderVisible = true;
        this.app.user = user;
        this.app.prepareTheCollections();

        this.router.navigate(['home']);

        break;
      case 'deleted':
        this.invalidLogin = true;
        this.invalidMessage = 'вашия акаунт е изтрит';
        break;
    }


    //   } else {
    //     this.invalidLogin = true;
    //     alert(data.message);
    //   }
    // });
  }


}
