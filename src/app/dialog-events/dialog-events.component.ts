import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndefined, isNumber } from 'util';
import { AppComponent } from '../app.component';
import { Valido } from '../core/valido';
import { User } from '../model/user.model';

@Component({
  selector: 'app-dialog-events',
  templateUrl: './dialog-events.component.html',
  styleUrls: ['./dialog-events.component.scss']
})
export class DialogEventsComponent implements OnInit {
  user: User;
  valido: Valido;

  eventForm: FormGroup = this.fb.group({
    fullName: [this.data ? this.data.fullName : null, Validators.required],
    name: [
      this.data ? this.data.name : null,
    ],
  });


  constructor(public dialogRef: MatDialogRef<DialogEventsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public snackBar: MatSnackBar) {

    this.valido = new Valido();
    this.user = AppComponent.myapp?.user;
  }

  ngOnInit(): void {
  }



  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({ data: this.eventForm.getRawValue() });
  }

  /**
   * 
   * @param fieldName 
   */
  isFieldValid(fieldName: string) {
    // if (!fieldName) {
    //   return false;
    // }
    let val: string = this.eventForm.get(fieldName)?.value;
    if (isNumber(val)) {
      return true;
    }

    if (isNullOrUndefined(val)) {
      val = '';
    }
    if (this.valido.isThereForbiddenWords(val)) {
      return false;
    }
    return !this.eventForm.get(fieldName).valid && this.eventForm.get(fieldName).touched;
  }

  ngOnDestroy(): void {
  }

}

