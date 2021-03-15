import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent extends BaseformComponent implements OnInit {
  editForm: FormGroup;
  discipline: Discipline;

  constructor(donkey: DonkeyService) {
    super();
    this.discipline = donkey.getData();
    console.log(this.discipline);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      id: [],
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
  }
}
