import { Component, Injector } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  GroupControllerService,
  RoleControllerService,
  UserControllerService,
} from 'libs/rest-client/src';
import { AppComponent } from '../app.component';
import { DonkeyService } from '../core/donkey.service';
import { Valido } from '../core/valido';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { User } from '../model/user.model';
import { TimeUtil } from '../utils/time-util';

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-blitcen',
  template: ` <p>beard</p> `,
  styleUrls: ['./blitcen.component.scss'],
})
/**
 * Master component.All components must be descendants of this !!!!!!!!
 */
export class BlitcenComponent {
  app: AppComponent = AppComponent.myapp;
  lang: string;
  langExt: string;
  user: User;

  protected apiUsers: UserControllerService;
  protected apiRoles: RoleControllerService;
  protected apiGroups: GroupControllerService;
  // protected apiDisciplines: DisciplineControllerService;
  // protected apiEvents: EventControllerService;

  protected router: Router;
  private snack: MatSnackBar;
  // protected formBuilder: FormBuilder;
  protected infoDialog: MatDialog;
  protected valido: Valido;
  // protected user: UserDto;
  protected canFetch = false;
  protected timeUtil: TimeUtil = new TimeUtil('bg-BG');

  constructor(injector: Injector, private snackBar: MatSnackBar) {
    if (!this.app?.user) {
      return;
    }
    this.user = this.app.user;

    this.apiUsers = this.addAuthorizationToService(
      injector.get(UserControllerService)
    );
    this.apiRoles = this.addAuthorizationToService(
      injector.get(RoleControllerService)
    );
    this.apiGroups = this.addAuthorizationToService(
      injector.get(GroupControllerService)
    );

    // this.apiEvents = this.addAuthorizationToService(
    //   injector.get(EventControllerService)
    // );

    this.valido = injector.get(Valido);
    this.router = injector.get(Router);
    this.snack = injector.get(MatSnackBar);
    //  this.formBuilder = injector.get(FormBuilder);
    this.infoDialog = injector.get(MatDialog);

    this.lang = AppComponent.lang;
    this.langExt =
      this.lang !== undefined && this.lang === 'bg' ? '_' + this.lang : '';
    this.checkUser();
  }

  addAuthorizationToService(service: any): any {
    const map: { [key: string]: string } = {};
    if (this.user) {
      map['Authorization'] = 'Bearer ' + this.user?.token;
    } else {
      map['Authorization'] = '';
    }
    service.configuration.apiKeys = map;
    return service;
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
   */
  showSnack(
    arg0: string,
    action: string,
    duartion: number
  ): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snack.open(arg0, action, {
      duration: duartion,
    });
    return snackBarRef;
  }

  showInfoDialog(
    label: string,
    singleMessage: string,
    messages: string[]
  ): void {
    const dialogData: any = {
      label,
      singleMessage,
      messages,
    };
    this.infoDialog.open(DialogInfoComponent, {
      width: 'auto',
      data: { dialogData },
    });
  }
  /**
   * A method that open confirmation dialog.
   */
  showConfirmDialog(
    label: string,
    singleMessage: string,
    messages: string[]
  ): MatDialogRef<DialogInfoComponent> {
    const dialogData: any = {
      label,
      singleMessage,
      messages,
      confirmation: true,
    };
    const dialogRef = this.infoDialog.open(DialogInfoComponent, {
      width: 'auto',
      data: { dialogData },
    });
    return dialogRef;
  }

  getWordBlobFromByteArray(byteArr: any): Blob {
    // The atob function will decode a Base64-encoded string into a new string with a character for each byte of the binary data.
    const byteCharacters = atob(byteArr);
    // Each character's code point (charCode) will be the value of the byte. We can create an array of byte
    // values by applying this using the.charCodeAt method for each character in the string.
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    // You can convert this array of byte values into a real typed byte array by
    // passing it to the Uint8Array constructor.
    const byteArray = new Uint8Array(byteNumbers);
    // This in turn can be converted to a BLOB by wrapping it in an array and passing it to the Blob constructor.
    let blob = new Blob([byteArray], { type: 'application/ms-word' });
    return blob;
  }
  /**
   *
   * @param name ticket_15.doc
   * @param url the blob url
   */
  fetchFile(name: string, url: string) {
    var anchor = document.createElement('a');
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
      names.forEach((fieldName) => {
        try {
          form.get(fieldName).disable();
        } catch (error) {}
      });
    }
  }

  disableFormFormArray(formArr: FormArray) {
    formArr.controls.forEach((group) => {
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
  loadDonkeyDataAndNavigate(
    donkey: DonkeyService,
    data: any,
    info: string,
    path: string[]
  ) {
    donkey.setData(data);
    donkey.setInfo(info);
    this.router.navigate(path);
  }

  goBack() {
    history.back();
  }
}
