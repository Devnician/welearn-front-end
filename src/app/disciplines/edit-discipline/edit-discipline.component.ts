import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'libs/rest-client/src';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { TimeUtil } from 'src/app/utils/time-util';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent extends BaseformComponent implements OnInit {
  editForm: FormGroup;
  discipline: Discipline;
  lectors: UserDto[];

  constructor(donkey: DonkeyService, ar: ActivatedRoute, injector: Injector) {
    super(injector);
    this.discipline = donkey.getData();
    if (this.discipline) {
      this.discipline.creationDate = TimeUtil.adjustDateStringToDateTime(this.discipline.creationDate);
      this.discipline.modifiedDate = TimeUtil.adjustDateStringToDateTime(this.discipline.modifiedDate);
    }

  }
  /**
   * Initializes the form
   */
  ngOnInit(): void {
    let roleOfTeachersID: number = this.roles?.find(r => r.role === 'teacher')?.id;
    if (roleOfTeachersID) {
      this.api.findAllUsersWithRoleId(roleOfTeachersID).subscribe(
        data => {
          this.lectors = data;
        }
      )
      console.log(this.discipline);
      this.editForm = this.formBuilder.group({
        id: this.discipline.id,
        name: this.discipline.name,
        creationDate: { value: this.discipline.creationDate, disabled: true },
        modifiedDate: { value: this.discipline.modifiedDate, disabled: true },
        teacher: this.discipline.lector,
        assistant: this.discipline.assistant
      });
    }

  }

  reset() {
    this.editForm.reset();
  }

  onSubmit() {
    if (!this.editForm.valid) {
      this.valido.validateAllFormFields(this.editForm);
      return;
    }
    let discipline: Discipline = this.editForm.getRawValue();
    this.api.updateDiscipline(discipline).subscribe(
      data => {
        this.showSnack('данните бяха промемени', '', 1300);
        this.router.navigate(['home/list-discipline']);
      }
    );
  }

  uploadDoc(input: any) {
    const file: File = input.files[0];
    if (!file.type.includes('doc')) {
      this.showSnack("Непозволен формат", "", 3000)
      input.value = '';
    } else {
      console.log(file);
      // place the documents in an array so that they can be sent for recording
    }
  }
}
