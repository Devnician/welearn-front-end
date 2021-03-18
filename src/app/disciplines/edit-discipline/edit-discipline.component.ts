import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent extends BaseformComponent implements OnInit {
  // @ViewChild('docFirst') firstDoc: ElementRef;
  // @ViewChild('docFirst') secondDoc: ElementRef;
  // @ViewChild('docFirst') thirdDoc: ElementRef;
  editForm: FormGroup;
  discipline: Discipline;
  lectors: User[];

  constructor(donkey: DonkeyService) {
    super();
    this.discipline = donkey.getData();
    console.log(this.discipline);
    this.discipline.createdAt = this.adjustDate(this.discipline.createdAt);
    this.discipline.updatedAt = this.adjustDate(this.discipline.updatedAt);

    this.lectors = AppComponent.myapp.users.filter(u => u.roleId === 2);
    console.log(this.lectors);
  }
  /**
   * Initializes the form
   */
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [],
      name: this.discipline.name,
      createdAt: { value: this.discipline.createdAt, disabled: true },
      updatedAt: { value: this.discipline.updatedAt, disabled: true },
      lectorId: this.discipline.lector?.id,
      assistantId: this.discipline.assistant?.id
    });
  }

  adjustDate(dateString: any): any {

    if (!dateString) {
      return '';
    }
    try {
      return new Date(dateString).toISOString().substring(0, 16);
    } catch (error) {
      return '';
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
  }

  uploadDoc(input: any) {
    const file: File = input.files[0];
    if (!file.type.includes('doc')) {
      this.showSnack("Непозволен формат", "", 3000)
      input.value = '';
    } else {
      console.log(file);
      // put all in array and send to API on submit
    }
  }
}
