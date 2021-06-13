import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  DisciplineControllerService,
  ResourceControllerService,
  UserDto
} from 'libs/rest-client/src';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { Role } from 'src/app/model/role.model';
import { ProcessTypes } from 'src/app/utils/process-enum';
import { TimeUtil } from 'src/app/utils/time-util';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss'],
})
export class EditDisciplineComponent
  extends BlitcenComponent
  implements OnInit
{
  form: FormGroup;
  discipline: Discipline;
  lectors: UserDto[];
  roles: Role[] = [];
  processType = ProcessTypes.CREATE;
  prefix = '';

  constructor(
    donkey: DonkeyService,
    ar: ActivatedRoute,
    injector: Injector,
    private formBuilder: FormBuilder,
    private apiDisciplines: DisciplineControllerService,
    private resourceControllerService: ResourceControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiDisciplines);
    this.addAuthorizationToService(resourceControllerService);
    let data = donkey.getData();
    this.discipline = data.discipline;
    this.processType = data.processType;
    this.prefix = data.prefix;

    console.log(this.processType);

    if (this.discipline) {
      this.discipline.creationDate = TimeUtil.adjustDateStringToDateTime(
        this.discipline.creationDate
      );
      this.discipline.modifiedDate = TimeUtil.adjustDateStringToDateTime(
        this.discipline.modifiedDate
      );
    }

    this.roles = AppComponent?.myapp?.roles;
  }
  /**
   * Initializes the form
   */
  ngOnInit(): void {
    this.apiUsers.listUserUsingGET1(2).subscribe((data) => {
      this.lectors = data;
      console.log(this.lectors);
    });

    const roleOfTeachersID: number = this.roles?.find(
      (r) => r.role === 'teacher'
    )?.id;
    if (roleOfTeachersID) {
      this.apiUsers.listUserUsingGET1(roleOfTeachersID).subscribe((data) => {
        this.lectors = data;
      });

      this.form = this.formBuilder.group({
        id: this.discipline ? this.discipline.id : 0,
        name: this.discipline ? this.discipline.name : null,
        teacherId: this.discipline ? this.discipline.teacher.userId : null,
        assistantId: this.discipline ? this.discipline.assistant.userId : null,
      });
    }
  }

  reset() {
    this.form.reset();
  }

  onSubmit() {
    if (!this.form.valid) {
      this.valido.validateAllFormFields(this.form);
      return;
    }
    const discipline: Discipline = this.form.getRawValue();
    switch (this.processType) {
      case ProcessTypes.CREATE:
        this.apiDisciplines
          .createDisciplineUsingPOST(discipline)
          .subscribe((data) => {
            if (data) {
              this.showSnack('дисциплината беше добавена', '', 1300);
              this.router.navigate(['home/list-discipline']);
            } else {
              this.showSnack('Нещо се обърка.', '', 1300);
            }
          });
        break;
      case ProcessTypes.UPDATE:
        this.apiDisciplines
          .editDisciplineUsingPUT(discipline)
          .subscribe((data) => {
            if (data) {
              this.showSnack('данните бяха промемени', '', 1300);
              this.router.navigate(['home/list-discipline']);
            } else {
              this.showSnack('Нещо се обърка.', '', 1300);
            }
          });
        break;

      default:
        alert('eeeeeee');
        this.router.navigate(['home/list-discipline']);
        break;
    }
  }
  //##############################################################
  //
  //   UPLOAD
  //
  //##############################################################
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {

    this.prepareFilesList($event);
    console.log(this.files);

    this.resourceControllerService.saveUsingPOST2( this.files[0],true, this.discipline.id).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
    console.log(this.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
