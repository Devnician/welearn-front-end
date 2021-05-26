import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDto } from 'libs/rest-client/src';
import { isNullOrUndefined, isNumber } from 'util';
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
  isMedia: boolean = false;
  studentNames: string;
  disciplines: FormArray = this.formBuilder.array([]);
  displayedSimColumns: string[] = ['id', 'name', 'mark'];

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
  }

  ngOnInit(): void {
    this.isMedia = AppComponent.isMedia;
    console.log(this.classType);
    switch (this.classType) {
      case 'marks':
        this.buildMarksForm(this.objectFromPage, this.collection);
        break;
      default:
        break;
    }
  }

  buildMarksForm(user: UserDto, discpilines: Discipline[]) {
    this.studentNames =
      user.firstName + ' ' + user.middleName + ' ' + user.lastName;
    this.form = this.formBuilder.group({
      userId: user.userId,
      disciplines: this.disciplines,
    });
    this.disciplines = this.formBuilder.array(
      discpilines.map((d) =>
        this.formBuilder.group({
          id: this.formBuilder.control(d.id),
          name: this.formBuilder.control(d.name),
          mark: this.formBuilder.control(d.mark),
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

  /**
   *
   * @param fieldName
   */
  isFieldValid(fieldName: string) {
    // if (!fieldName) {
    //   return false;
    // }
    let val: string = this.form.get(fieldName)?.value;
    if (isNumber(val)) {
      return true;
    }

    if (isNullOrUndefined(val)) {
      val = '';
    }
    if (this.valido.isThereForbiddenWords(val)) {
      return false;
    }
    return !this.form.get(fieldName).valid && this.form.get(fieldName).touched;
  }

  ngOnDestroy(): void {}
}
