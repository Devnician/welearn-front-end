import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { DisciplineControllerService, GroupDto } from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent extends BlitcenComponent implements OnInit {
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  addForm: FormGroup;
  disciplinesFormArray: FormArray = this.formBuilder.array([new Discipline()]);
  students: FormArray = this.formBuilder.array([]);
  displayedColumns = ['name', 'teacher', 'assistant', 'remove'];
  disciplines: Discipline[] = [];

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    private apiDisciplines: DisciplineControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiDisciplines);
  }

  ngOnInit(): void {
    this.apiDisciplines.getDisciplinesUsingGET().subscribe((data) => {
      this.disciplines = data as Discipline[];
    });

    this.addForm = this.formBuilder.group({
      groupId: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      createdDate: new Date(),
      modifiedDate: new Date(),
      maxResourcesMb: 0,
      disciplines: this.disciplinesFormArray,
    });
  }

  /**
   * Selection handler. Checks for already selected item, replaces empty row with actual object, adds rows for the next discipline and refreshes the table.
   * @param index on which row
   * @param discipline selected element for this.disciplines
   */
  onDisciplineSelected(index: number, discipline: Discipline) {
    if (
      this.disciplinesFormArray.controls.findIndex(
        (c) => c.value['id'] === discipline.id
      ) < 0
    ) {
      this.disciplinesFormArray.controls[index].reset();
      this.disciplinesFormArray.controls[index].patchValue(discipline);
    } else {
      this.showSnack('Този дисциплина вече е избрана', '', 3000);
      this.disciplinesFormArray.controls =
        this.disciplinesFormArray.controls.slice(0, index);
    }
    this.addEmptyRow();
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
      teacher: this.formBuilder.control(d.teacher),
      assistant: this.formBuilder.control(d.assistant),
    });
    this.disciplinesFormArray.push(discGroup);
  }
  /**
   * Delete element from FormArray controls by discipline id
   * @param id
   */
  delete(id: any) {
    this.disciplinesFormArray.controls =
      this.disciplinesFormArray.controls.filter(
        (contr) => contr.value['id'] != id
      );
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
    let group: GroupDto = this.addForm.getRawValue();
    //remove fake row
    group.disciplines = group.disciplines.filter((d) => d?.id);
    this.apiGroups.saveGroupUsingPOST(group).subscribe((data) => {
      this.showSnack('Данните са записани успешно.', '', 1300);
      history.back();
    });
  }

  reset() {
    this.addForm.reset();
  }
}
