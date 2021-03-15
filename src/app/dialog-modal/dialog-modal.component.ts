import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { isNullOrUndefined, isNumber } from 'util';
import { AppComponent } from '../app.component';
import { ImageSnippet } from '../baseform/baseform.component';
import { ApiService } from '../core/api.service';
import { Valido } from '../core/valido';
import { StudentsGroup } from '../model/students-group.model';
import { User } from '../model/user.model';
import { TimeUtil } from '../utils/time-util';
export class ImageCouple {
  constructor(public sanitized: string, public snippet: ImageSnippet) {
  }
}

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss'],
})

export class DialogModalComponent implements OnInit, OnDestroy {
  private user: User;
  protected timeUtil: TimeUtil = new TimeUtil('bg-BG');
  objectFromPage: any;
  //collectionFromPage: any;
  fromDialog: string;
  form: FormGroup;
  mode: string;
  classType: string;
  valido: Valido;

  //map: ImageCouple[] = [];
  //imgDirty: boolean = false;
  // isImageLoading: boolean = false;
  isMedia: boolean = false;
  //simSelected: boolean = false;
  // states = [
  //   { id: 1, query: 'in offices', display: 'в офиси' },
  //   { id: 2, query: 'in customers', display: 'в клиенти' },
  //   { id: 3, query: 'in cars', display: 'в автомобили' },
  //   { id: 4, query: 'unknown', display: 'неизвестни' }];

  //currentSimHolderFilter: string = 'Telenor';

  closeMode = 'close';
  message: string;

  constructor(public dialogRef: MatDialogRef<DialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private api: ApiService, public snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    this.objectFromPage = data.obj;

    // if (!isNullOrUndefined(data.collection)) {
    //   this.collectionFromPage = data.collection;
    // }
    this.mode = data.mode;
    this.classType = data.classType;
    this.valido = new Valido();
    this.user = AppComponent.myapp.user;
  }

  ngOnInit(): void {
    this.isMedia = AppComponent.isMedia;
    console.log(this.classType);
    switch (this.classType) {
      case 'group':
        this.buildGroupForm();
        break;

      default:
        break;
    }
  }

  buildGroupForm() {
    let group: StudentsGroup = this.objectFromPage;
    this.form = this.formBuilder.group({
      id: [group.id],
      name: [group.name, Validators.required],
      startDate: [group.startDate, Validators.required],
      endDate: [group.endDate],
      open: [group.open, Validators.required]
    });
  }


  addSimpleControlsToFormGroup(formGroup: FormGroup, object: any, names: string[]) {
    if (formGroup) {
      names.forEach(element => {
        formGroup.addControl(element, new FormControl(object[element]));
      });
    }
  }

  close() {
  }

  save() {
  }

  /**
   * 
   * @param fieldName 
   */
  isFieldValid(fieldName: string) {
    // if (!fieldName) {
    //   return false;
    // }
    let val: string = this.form.get(fieldName).value;
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


  ngOnDestroy(): void {
  }
}
