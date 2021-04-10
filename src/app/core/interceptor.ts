import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs/internal/Observable";
import { AppComponent } from "../app.component";

const jwtHelper = new JwtHelperService();

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let token = localStorage.getItem('user');
    let token = AppComponent.myapp.user?.token;

    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token
          }
        });
      } else {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      }
    }
    return next.handle(request);
  }
}