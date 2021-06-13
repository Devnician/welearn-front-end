import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDto } from 'libs/rest-client/src';
import { AppComponent } from '../app.component';
import { Valido } from '../core/valido';
import { Discipline } from '../model/discipline.model';
import { TimeUtil } from '../utils/time-util';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
})
export class DialogModalComponent implements OnInit, OnDestroy {
  private user: UserDto;
  protected timeUtil: TimeUtil = new TimeUtil('bg-BG');
  objectFromPage: any;
  collection: any;
  form: FormGroup;
  mode: string;
  classType: string;
  valido: Valido;
  isMedia = false;
  studentNames: string;
  disciplines: FormArray = this.formBuilder.array([]);
  displayedSimColumns: string[] = ['id', 'name', 'mark'];
  groupId: string;

  constructor(
    public dialogRef: MatDialogRef<DialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    this.objectFromPage = data?.obj;
    this.collection = data?.collection;
    this.mode = data?.mode;
    this.classType = data?.classType;
    this.valido = new Valido();
    this.user = AppComponent.myapp?.user;
    this.groupId = data?.groupId;
  }

  ngOnInit(): void {
    this.isMedia = AppComponent.isMedia;
    console.log(this.classType);
    switch (this.classType) {
      case 'marks':
        this.buildMarksForm(this.objectFromPage, this.collection, this.groupId);
        break;
      default:
        break;
    }
  }

  buildMarksForm(user: UserDto, discpilines: Discipline[], groupId: string) {
    this.studentNames =
      user.firstName + ' ' + user.middleName + ' ' + user.lastName;
    this.form = this.formBuilder.group({
      disciplines: this.disciplines,
    });
    this.disciplines = this.formBuilder.array(
      discpilines.map((d, index) =>
        this.formBuilder.group({
          rowSequence: this.formBuilder.control(index + 1),
          disciplineId: this.formBuilder.control(d.id),
          userId: user.userId,
          groupId,
          name: this.formBuilder.control(d.name),
          markValue: this.formBuilder.control(user.evaluationMarks.filter(m => m.disciplineId === d.id)[0]?.markValue?.toString()),
          id: this.formBuilder.control(user.evaluationMarks.filter(m => m.disciplineId === d.id)[0]?.id),
        })
      )
    );
    this.form.setControl('disciplines', this.disciplines);
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.form.getRawValue() });
  }

  ngOnDestroy(): void { }
}
