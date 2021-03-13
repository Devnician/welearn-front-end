import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { AppComponent } from 'src/app/app.component';
import { BaseformComponent, ImageSnippet } from '../../baseform/baseform.component';
import { User } from '../../model/user.model';


// import { ImageService } from '../core/image-service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseformComponent implements OnInit {
  selectedRoleId: number;
  IDCard: ImageSnippet;
  DrivingLicense: ImageSnippet;
  addForm: FormGroup;

  constructor(app: AppComponent) {
    super();
    // this.snackBar.open("Something went wrong!", "Ok", {
    //   duration: 1000,
    // });
  }
  ngOnInit() {
    this.roles = this.app.roles;
    //this.loadRoles();


    this.addForm = this.formBuilder.group({
      id: [],
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

  }

  removeImage(name: string) {
    switch (name) {
      case 'idcard':
        this.IDCard = undefined;
        break;
      case 'drlicense':
        this.DrivingLicense = undefined;
        break;
      default:
        break;
    }
  }



  /**
   * Checks field
   * @param field the field
   * return True if it is valed false otherwise
   */
  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && this.addForm.get(field).touched;
  }

  /**
   * Clear form
   */
  reset() {
    this.addForm.reset();
  }

  /**
   * Submit form if is valid
   */
  onSubmit() {

    if (!this.addForm.valid) {
      //Check before..
      this.valido.validateAllFormFields(this.addForm);
      return;
    }

    let newUser: User = this.addForm.value;

    let images: File[] = [];
    if (this.IDCard) {
      images[0] = this.IDCard.file;
    } else {
      images[0] = undefined;
    }

    if (this.DrivingLicense) {
      images[1] = this.DrivingLicense.file;
    } else {
      images[1] = undefined;
    }

    // this.api.createUser(newUser)
    //   .subscribe(data => {

    //     newUser = data.result;
    //     this.api.uploadImage(images, newUser).subscribe(

    //       data => {

    //         let idCardIndex: number = 0; // for good readability
    //         let drivLicenseIndex: number = 1;

    //         if (this.IDCard && this.IDCard.status === 'ok') {
    //           let idCard: string = data.result[idCardIndex] + ':' + this.IDCard.file.type;
    //           newUser.idCardImage = idCard;
    //         }
    //         if (this.DrivingLicense && this.DrivingLicense.status === 'ok') {
    //           let drLic: string = data.result[drivLicenseIndex] + ':' + this.DrivingLicense.file.type;
    //           newUser.drivingLicenseImage = drLic;
    //         }
    //         //Clear pass before update - this is NEW USER!!!
    //         newUser.password = 'unknown';

    //         this.api.updateUser(newUser).subscribe(
    //           (data) => {
    //             let snackBarRef = this.snack.open(data.message, "Ok", {
    //               duration: 5000,
    //             });
    //             snackBarRef.afterDismissed().subscribe(() => {
    //               this.router.navigate(['home/list-user']);
    //             });
    //           }
    //         );
    //       }
    //     );
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

  private onError(snippet: ImageSnippet) {
    snippet.pending = false;
    snippet.status = 'fail';
    snippet.src = '';
  }
}