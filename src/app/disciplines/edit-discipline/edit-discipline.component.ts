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
import { FileUtil } from 'src/app/utils/file-util';
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
  fileUtil: FileUtil;

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
    this.fileUtil = new FileUtil(this.resourceControllerService, this);
    let data = donkey.getData();
    this.discipline = data.discipline;
    this.processType = data.processType;
    this.prefix = data.prefix; // dialog label

    if (this.discipline) { 
      
      this.discipline.creationDate = TimeUtil.adjustDateStringToDateTime(
        this.discipline.creationDate
      );
      this.discipline.modifiedDate = TimeUtil.adjustDateStringToDateTime(
        this.discipline.modifiedDate
      );

      let fileIds = this.discipline.resourceIds;

      console.log(fileIds);
      
      if (fileIds.length > 0) {
        fileIds.forEach((file) => {
          this.resourceControllerService
            .getByIdUsingGET2(file)
            .subscribe((dto) => {
              this.fileUtil.push(dto);
              console.log(dto);
            });
        });
      }
    }

    this.roles = AppComponent?.myapp?.roles;
  }

  /**
   * Initializes the form
   */
  ngOnInit(): void {
    this.apiUsers.listUserUsingGET1(2).subscribe((data) => {
      this.lectors = data; 
    }); 
    
    const roleOfTeachersID: number = this.roles?.find(
      (r) => r.role === 'teacher'
    )?.id;
    if (roleOfTeachersID) { 
      this.form = this.formBuilder.group({
        id: this.discipline ? this.discipline.id : 0,
        name: this.discipline ? this.discipline.name : null,
        teacherId: this.discipline ? this.discipline.teacher?.userId : null,
        assistantId: this.discipline ? this.discipline.assistant?.userId : null,
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

              this.fileUtil.saveFilesForDiscipline(this.discipline.id);

              this.router.navigate(['home/list-discipline']);
            } else {
              this.showSnack('Нещо се обърка.', '', 1300);
            }
          });
        break;

      default:
        this.router.navigate(['home/list-discipline']);
        break;
    }
  } 
}
