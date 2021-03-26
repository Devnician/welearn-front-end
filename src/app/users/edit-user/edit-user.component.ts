import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/internal/Subject';
import { DonkeyService } from 'src/app/core/donkey.service';
import { BaseformComponent, ImageSnippet } from '../../baseform/baseform.component';
import { User } from "../../model/user.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends BaseformComponent implements OnInit {

  private _destroyed$ = new Subject();
  loggedUser: User;
  editUser: User;
  editForm: FormGroup;
  sanitizedImageIdCard: any;
  sanitizedImageDrLicense: any;
  IDCard: ImageSnippet;
  DrivingLicense: ImageSnippet;
  // canView: boolean = true;
  // canEdit: boolean = false;
  // canDelete: boolean = false;

  parentDir: string = 'home/list-user';
  selfEdit: boolean = false;

  constructor(private dateAdapter: DateAdapter<Date>, private sanitizer: DomSanitizer, private donkey: DonkeyService) {
    super();
    const currentMenu = this.app.getCurrentMenuObject('/' + this.parentDir);
    this.selfEdit = donkey.getInfo() == 'self';
    console.log(this.selfEdit);
    this.editUser = donkey.getData();
    // this.canDelete = currentMenu.remove == 1;
    // this.canEdit = currentMenu.edit == 1;
    // this.canView = currentMenu.preview == 1;
    // this.dateAdapter.format(new Date(),'YYYY-mm-dd');
    // this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    if (!this.editUser.userId) {
      history.back();
    }

    this.editForm = this.formBuilder.group({
      userId: [],
      username: ['', Validators.required],
      password: ['', this.valido.validatePassowrd(6, 30)],
      firstName: ['', this.valido.validateName(2, 30)],
      middleName: ['', this.valido.validateName(2, 30)],
      lastName: ['', this.valido.validateName(2, 30)],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      roleId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', this.valido.validatePhone(true)],
      otherContacts: [''],
      deleted: ['', ''],
      // drivingLicenseImage: [],
      // idCardImage: [],
      // drivingLicenseImg: [],
      // idCardImg: [], 
      loggedIn: []
    });

    if (this.selfEdit === true) {
      this.disableFormFields(this.editForm, ["username", "roleId",
        "birthDate",]);
    }
    console.log(this.editUser);

    //TODO+--------

    this.editForm.patchValue(this.editUser);

    // this.api.getUserByIdForEdit(+userId, 1)
    //   .subscribe((data: { result: User; }) => {

    //     this.editUser = data.result;
    //     this.editUser.deleted = this.editUser.deleted ? 1 : 0;
    //     this.editUser.password = 'unknown';

    //     //= 'data:image/png;base64,' + data.result.drivingLicenseImg;
    //     try {
    //       let imageIdCardType: string = this.editUser.idCardImage;
    //       let idCardType: string[] = imageIdCardType.split(':');
    //       let image: string = 'data:' + idCardType[1] + ';base64,' + data.result.idCardImg;
    //       this.sanitizedImageIdCard = this.sanitizer.bypassSecurityTrustUrl(image);
    //     } catch (error) {
    //     }

    //     try {
    //       let imageDrLicType: string = this.editUser.drivingLicenseImage;
    //       let drLicenseType: string[] = imageDrLicType.split(':');
    //       let image2: string = 'data:' + drLicenseType[1] + ';base64,' + data.result.drivingLicenseImg;
    //       this.sanitizedImageDrLicense = this.sanitizer.bypassSecurityTrustUrl(image2);

    //     } catch (error) {
    //     }
    //     this.editForm.setValue(this.editUser);
    //   });

  }

  /**
 * Adds user images.
 * @param imageInput  
 * @param type  Two types are allowed: 'idcard' and 'drlicense'
 */
  addFile(imageInput: any, type: string) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      switch (type) {
        case 'idcard':
          this.IDCard = new ImageSnippet(event.target.result, file);
          this.onSuccess(this.IDCard);
          break;
        case 'drlicense':
          this.DrivingLicense = new ImageSnippet(event.target.result, file);
          this.onSuccess(this.DrivingLicense);
          break;

        default:
          break;
      }
    });

    reader.readAsDataURL(file);
  }

  private onSuccess(snippet: ImageSnippet) {
    snippet.pending = false;
    snippet.status = 'ok';
  }

  /**
 * Checks field
 * @param field the field
 * return True if it is valed false otherwise
 */
  isFieldValid(field: string) {
    return !this.editForm.get(field).valid && this.editForm.get(field).touched;
  }
  /**
   * 
   */
  onSubmit() {
    this.shouldIValidatePass();

    if (!this.editForm.valid) {
      this.valido.validateAllFormFields(this.editForm);
      return;
    }

    let user: User = this.editForm.getRawValue();

    if (user.roleId !== 1) { // Can't delete root user
      user.deleted = user.deleted ? 1 : 0;
    }

    delete user.birthDate;
    console.log(user);
    return;
    this.api.updateUser(user).subscribe(
      data => {
        console.log(data);
      }
    );
    // let images: File[] = [];
    // images[0] = this.IDCard ? this.IDCard.file : undefined;
    // images[1] = this.DrivingLicense ? this.DrivingLicense.file : undefined;

    // this.api.uploadImage(images, user).subscribe(
    //   (data: { result: string[]; }) => {

    //     if (this.IDCard && this.IDCard.status === 'ok') {
    //       let idCard: string = data.result[0] + ':' + this.IDCard.file.type;
    //       user.idCardImage = idCard;
    //     }
    //     if (this.DrivingLicense && this.DrivingLicense.status === 'ok') {
    //       let drLic: string = data.result[1] + ':' + this.DrivingLicense.file.type;
    //       user.drivingLicenseImage = drLic;
    //     }

    //     this.api.updateUser(user)
    //       .pipe(first(), takeUntil(this._destroyed$))
    //       .subscribe(
    //         data => {
    //           if (data.status === 200) {

    //             if (data.result.id == 1 || data.result.id === this.user.id) {
    //               //if this is the 'super user' update OR self update
    //               let snackBarRef = this.snack.open(data.message, "Ok", {
    //                 duration: 1500,
    //               });
    //               snackBarRef.afterDismissed().subscribe(() => {
    //                 this.app.logout();
    //               });
    //             } else {
    //               let snackBarRef = this.snack.open(data.message, "Ok", {
    //                 duration: 5000,
    //               });
    //               snackBarRef.afterDismissed().subscribe(() => {
    //                 this.goBack();
    //               });
    //             }

    //           } else {
    //             let snackBarRef = this.snack.open(data.message, "Ok", {
    //               duration: 5000,
    //             });
    //             snackBarRef.afterDismissed().subscribe(() => {
    //               this.goBack();
    //             });
    //           }
    //         },
    //         error => {
    //           alert('4 ' + error);
    //         });
    //   }
    // );

  }

  /**
   * 
   * Check pass field for changes. If not changes the remove validators.
   */
  shouldIValidatePass() {
    const control = this.editForm.get('password');
    let pass: string = control.value;
    if (pass == 'unknown' || pass == '') {
      control.clearValidators();
      control.updateValueAndValidity();
    }
  }


  public ngOnDestroy(): void {
    console.log("DESTROY edit user");
    //  this.app.unblockEditedUserIfAny();
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}