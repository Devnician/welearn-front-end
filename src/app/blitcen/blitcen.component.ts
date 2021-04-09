import { Component, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDto } from 'libs/rest-client/src';
import { AppComponent } from '../app.component';
import { ApiService } from '../core/api.service';
import { DonkeyService } from '../core/donkey.service';
import { Valido } from '../core/valido';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { TimeUtil } from '../utils/time-util';

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-blitcen',
  template: `
    <p>
      beard
    </p>
  `,
  styleUrls: ['./blitcen.component.scss']
})
/**
 * Master component.All components must be descendants of this !!!!!!!! 
 */
export class BlitcenComponent {
  app: AppComponent = AppComponent.myapp;
  lang: string;
  langExt: string;
  protected api: ApiService;
  protected router: Router;
  protected snack: MatSnackBar;
  protected formBuilder: FormBuilder;
  protected infoDialog: MatDialog;
  protected valido: Valido;
  protected user: UserDto;
  protected canFetch: boolean = false;
  protected timeUtil: TimeUtil = new TimeUtil('bg-BG');

  constructor(injector: Injector) {
    this.api = injector.get(ApiService);
    this.valido = injector.get(Valido);
    this.router = injector.get(Router);
    this.snack = injector.get(MatSnackBar);
    this.formBuilder = injector.get(FormBuilder);
    this.infoDialog = injector.get(MatDialog);

    this.lang = AppComponent.lang;
    this.langExt = (this.lang != undefined && this.lang === 'bg') ? "_" + this.lang : '';
    this.checkUser();
  }
  private checkUser() {
    // this.user = this.app.user;
    // this.canFetch = true;
    //let failed: boolean = false;


    // try {
    //   let token = localStorage.getItem('user');
    //   if (isNullOrUndefined(token) === true || jwtHelper.isTokenExpired(token)) {
    //     failed = true;
    //   } else { // all is good
    //     try {
    //       const tokenPayload = jwtHelper.decodeToken(token);
    //       if (tokenPayload.userId === this.app.user.id) {
    //         this.user = this.app.user;
    //         console.log(this.user);
    //         this.canFetch = true;
    //       } else {
    //         failed = true;
    //       }
    //     } catch (error) {
    //       failed = true;
    //     }
    //   }
    // } catch (error) {
    //   failed = true;
    // }
    // if (failed === true) {
    //   this.goToLoginPage();
    // }
  }

  goToLoginPage() {
    this.router.navigate(['']);
  }


  /**
   * 
   * @param arg0  text
   * @param action  buttons
   * @param duartion in milliseconds 
   * @returns 
   */
  showSnack(arg0: string, action: string, duartion: number): MatSnackBarRef<SimpleSnackBar> {
    let snackBarRef = this.snack.open(arg0, action, {
      duration: duartion,
    });
    return snackBarRef;
  }

  showInfoDialog(label: string, singleMessage: string, messages: string[]): void {
    let dialogData: any = { 'label': label, 'singleMessage': singleMessage, 'messages': messages };
    this.infoDialog.open(DialogInfoComponent, {
      width: 'auto',
      data: { dialogData }
    });
  }
  /**
   * A method that open confirmation dialog.
   * @param label 
   * @param singleMessage 
   * @param messages 
   */
  showConfirmDialog(label: string, singleMessage: string, messages: string[]): MatDialogRef<DialogInfoComponent> {
    let dialogData: any = { 'label': label, 'singleMessage': singleMessage, 'messages': messages, 'confirmation': true };
    const dialogRef = this.infoDialog.open(DialogInfoComponent, {
      width: 'auto',
      data: { dialogData }
    });
    return dialogRef;
  }


  getWordBlobFromByteArray(byteArr: any): Blob {
    // The atob function will decode a Base64-encoded string into a new string with a character for each byte of the binary data.
    const byteCharacters = atob(byteArr);
    //Each character's code point (charCode) will be the value of the byte. We can create an array of byte values by applying this using the .charCodeAt method for each character in the string.
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    //You can convert this array of byte values into a real typed byte array by passing it to the Uint8Array constructor.
    const byteArray = new Uint8Array(byteNumbers);
    //This in turn can be converted to a BLOB by wrapping it in an array and passing it to the Blob constructor.
    let blob = new Blob([byteArray], { type: 'application/ms-word' });
    return blob;
  }
  /**
   * 
   * @param name ticket_15.doc
   * @param url the blob url
   */
  fetchFile(name: string, url: string) {
    var anchor = document.createElement("a");
    anchor.download = name;
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();
  }

  /**
   *  Tries to disable given fields if they are present in the form 
   */
  disableFormFields(form: FormGroup, names: string[]) {
    if (names) {
      names.forEach(fieldName => {
        try {
          form.get(fieldName).disable();
        } catch (error) {
        }
      });
    }
  }


  disableFormFormArray(formArr: FormArray) {
    formArr.controls.forEach(group => {
      if (group instanceof FormGroup) {
        group.disable();
      }
    });
  }

  /**
   * Loads data into donkey object and send him to given module
   * @param donkey  The donkey of caller
   * @param data Object for processing
   * @param info  Useful data or key
   * @param path for where
   */
  loadDonkeyDataAndNavigate(donkey: DonkeyService, data: any, info: string, path: string[]) {
    donkey.setData(data);
    donkey.setInfo(info);
    this.router.navigate(path);
  }
}
