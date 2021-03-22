import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { Discipline } from 'src/app/model/discipline.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.scss']
})
export class AddDisciplineComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;
  lectors: User[];
  constructor() {
    super();
  }

  ngOnInit(): void {

    this.lectors = AppComponent.myapp.users.filter(u => u.roleId === 2);

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

  uploadDoc(doc: any) {

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
