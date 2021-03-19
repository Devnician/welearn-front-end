import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.scss']
})
export class AddDisciplineComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: 0,
      name: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lectorId: 0,
      assistantId: 0
    });
  }

  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    if (!this.addForm.valid) {
      this.valido.validateAllFormFields(this.addForm);
      return;
    }
    alert("api call");
    let discipline: Discipline = this.addForm.getRawValue();
    console.log(discipline);
    //TODO add post api call for array with documents

  }

}
