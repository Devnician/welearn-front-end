import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from '../app.component';
import { Error } from '../model/error.model';
import { ApiService } from './api.service';

const jwtHelper = new JwtHelperService();

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private online: boolean = true;

    constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }

    /**
     * Shows error in console and send it to backend.
     * @param error 
     */
    handleError(error: { message: any; toString: () => any; stack: any; }) {
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            // console.log('Server or connection error happened');

            this.online = false;
            if (!navigator.onLine) {
                console.log("OFFLINE");
            } else {

                // Handle Http Error (error.status === 403, 404...)
                console.log("HTTP ERROR");

                if (error.status === 401) {
                    //"Unauthorized"
                  //  localStorage.removeItem('user');//delete token 
                    let snackBarRef = this.snackBar.open("Unauthorized access.", "", {
                        duration: 3000,
                    });
                }
                // if (error.status === 0) {

                // }
            }
            AppComponent.myapp.showApiStatus(this.online);
        } else {
            console.log('Angular Error, ReferenceError...');
            console.log(error);
        }


        try {
            let token = localStorage.getItem('user');

            const err = {
                message: error.message ? error.message : error.toString(),
                stack: error.stack ? error.stack : ''
            };
            if (token) {
                let e = new Error();
                e.message = err.message;

                if (e.message.startsWith('Http failure')) {
                    AppComponent.myapp.showApiStatus(false);
                } else {
                    if (this.online === true) {
                        e.trace = err.stack;
                        e.service = 'frontend';
                      //  let id = jwtHelper.decodeToken(token).userId;
                        console.log('ERROR - see logs');
                        console.log(err.stack);
                      //  e.userId = id;
                        console.log(e);
                       // this.apiService.logError(e);
                    } else {
                        console.log('api is down');
                    }
                }
            } else {

                console.log(error);
            }

        } catch (error) {
            console.log('Not logged yet...');
        }
    }
}