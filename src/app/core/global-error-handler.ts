import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { Error } from '../model/error.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private online = true;

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Shows error in console and send it to backend.
   */
  handleError(error: { message: any; toString: () => any; stack: any }) {
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      // console.log('Server or connection error happened');

      this.online = false;
      if (!navigator.onLine) {
        console.log('OFFLINE');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        console.log('HTTP ERROR', error.status);
        switch (error.status) {
          case 0:
            this.snackBar.open('Backend is offline.', '', {
              duration: 3000,
            });
            AppComponent.myapp.serverOnline = this.online;
            break;
          case 401:
            this.snackBar.open('Unauthorized access.', '', {
              duration: 3000,
            });
            break;

          default:
            break;
        }
        console.log(error);
      }
    } else {
      console.log('Angular Error, ReferenceError...');
      console.log(error);
    }

    try {
      const err = {
        message: error.message ? error.message : error.toString(),
        stack: error.stack ? error.stack : '',
      };
      if (AppComponent.myapp.user?.token) {
        const e = new Error();
        e.message = err.message;

        if (e.message.startsWith('Http failure')) {
          AppComponent.myapp.serverOnline = false;
        } else {
          if (this.online === true) {
            e.trace = err.stack;
            e.service = 'frontend';

            console.log('ERROR - see logs');
            console.log(err.stack);
            console.log(e);
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
