import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { User } from 'src/app/model/user.model';
import { TimeUtil } from 'src/app/utils/time-util';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent extends BaseformComponent implements OnInit {
  editForm: FormGroup;
  discipline: Discipline;
  lectors: User[];

  constructor(donkey: DonkeyService) {
    super();
    this.discipline = donkey.getData();
    this.discipline.createdAt = TimeUtil.adjustDateStringToDateTime(this.discipline.createdAt);
    this.discipline.updatedAt = TimeUtil.adjustDateStringToDateTime(this.discipline.updatedAt);
  }
  /**
   * Initializes the form
   */
  ngOnInit(): void {

    //TODO --- add api call in onInit Method for loading just lectors.
    //  this.lectors = AppComponent.myapp.users.filter(u => u.roleId === 2);

    this.editForm = this.formBuilder.group({
      id: this.discipline.id,
      name: this.discipline.name,
      createdAt: { value: this.discipline.createdAt, disabled: true },
      updatedAt: { value: this.discipline.updatedAt, disabled: true },
      lectorId: this.discipline.lector?.userId,
      assistantId: this.discipline.assistant?.userId
    });
  }

  reset() {
    this.editForm.reset();
  }

  onSubmit() {
    if (!this.editForm.valid) {
      this.valido.validateAllFormFields(this.editForm);
      return;
    }

    alert("api call");
    let discipline: Discipline = this.editForm.getRawValue();
    console.log(discipline);

    //TODO add post api call for array with documents
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
