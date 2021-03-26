import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { Discipline } from 'src/app/model/discipline.model';
import { StudentsGroup } from 'src/app/model/students-group.model';


@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent extends BaseformComponent implements OnInit {
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  addForm: FormGroup;
  disciplinesFormArray: FormArray = this.formBuilder.array([new Discipline()]);
  students: FormArray = this.formBuilder.array([]);
  displayedColumns = ['name', 'lector', 'assistant', 'remove'];
  disciplines: Discipline[] = [];

  constructor() {
    super();
  }
  /**
   * TODO - add api call for disciplines
   * Initializes the form for adding.
   */
  ngOnInit(): void {
    //TODO add api call
    this.disciplines = AppComponent.myapp.disciplines;

    this.addForm = this.formBuilder.group({
      id: 0,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      createdDate: new Date(),
      modifiedDate: new Date(),
      disciplines: this.disciplinesFormArray
    });
  }

  /**
   * Selection handler. Checks for already selected item, replaces empty row with actual object, adds rows for the next discipline and refreshes the table.
   * @param index on which row
   * @param discipline selected element for this.disciplines
   */
  onDisciplineSelected(index: number, discipline: Discipline) {
    if (this.disciplinesFormArray.controls.findIndex(c => c.value['id'] === discipline.id) < 0) {
      this.disciplinesFormArray.controls[index].reset();
      this.disciplinesFormArray.controls[index].patchValue(discipline);
    } else {
      this.showSnack("Този дисциплина вече е избрана", "", 3000);
      this.disciplinesFormArray.controls = this.disciplinesFormArray.controls.slice(0, index);
    }
    this.addEmptyRow()
    this.table.renderRows();
  }
  /**
   * Adds empty row to table
   */
  addEmptyRow() {
    let d = new Discipline();
    let discGroup = this.formBuilder.group({
      id: this.formBuilder.control(d.id),
      name: this.formBuilder.control(d.name),
      lector: this.formBuilder.control(d.lector),
      assistant: this.formBuilder.control(d.assistant)
    });
    this.disciplinesFormArray.push(discGroup)
  }
  /**
   * Delete element from FormArray controls by discipline id
   * @param id 
   */
  delete(id: any) {
    this.disciplinesFormArray.controls = this.disciplinesFormArray.controls.filter(contr => contr.value['id'] != id);
  }
  /**
   * Checks given field in form
   * @param field 
   * @returns 
   */
  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && this.addForm.get(field).touched;
  }
  /**
   *TODO -  Add API call, notify user and go back.
   */
  onSubmit() {
    let group: StudentsGroup = this.addForm.getRawValue();
    //remove fake row
    group.disciplines = group.disciplines.filter(d => d.id.length > 0);
    //there may be a conflict with api - dates, or stamps  --check this 
    console.log(group);
    this.showSnack("Данните са записани успешно.", "", 1300);
    history.back();
  }

  reset() {
    this.addForm.reset();
  }
}
