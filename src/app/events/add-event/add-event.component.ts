import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  EventControllerService,
  EventDto,
  GroupDto,
  UserDto,
} from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { Discipline } from 'src/app/model/discipline.model';
import EVENT_TYPES from '../event-types';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent extends BlitcenComponent implements OnInit {
  isEditMode = true;
  addForm: FormGroup;
  minDate: Date = new Date();

  eventTypes = EVENT_TYPES;
  selected: EVENT_TYPES.Lection;
  groups: GroupDto[] = [];
  owners: UserDto[] = [];
  disciplines: Discipline[] = [];
  selectedGroup: GroupDto;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EventDto,
    private dialogRef: MatDialogRef<AddEventComponent>,
    private apiEvents: EventControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiEvents);
  }

  ngOnInit(): void {
    this.apiGroups.findAllUsingGET2().subscribe((data) => {
      this.groups = data;
    });

    // const eventDto: EventDto;
    // blacklist?: Array<UserDto>;
    // description?: string;
    // groupId?: string;
    // name: string;

    this.isEditMode = this.data.eventId?.length > 0;

    console.log('Is CREATE MODE ' + this.isEditMode);

    this.addForm = this.formBuilder.group({
      id: [this.isEditMode ? this.data.eventId : ''],

      type: [this.isEditMode ? this.data.type : null, Validators.required],

      name: [this.isEditMode ? this.data.name : null, Validators.required],
      startDate: [
        this.isEditMode ? this.data.startDate : null,
        Validators.required,
      ],
      endDate: [
        this.isEditMode ? this.data.endDate : null,
        Validators.required,
      ],
      description: [
        this.isEditMode ? this.data.description : null,
        Validators.required,
      ],

      group: ['', Validators.required],
      discipline: [
        this.isEditMode ? this.data.discipline : null,
        Validators.required,
      ],
    });

    //this.addForm.controls.type.setValue(EVENT_TYPES.Lection);
  }

  /**
   * Checks field
   * @param field the field
   * return True if it is valed false otherwise
   */
  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && this.addForm.get(field).touched;
  }

  /**
   * Clear form
   */
  reset() {
    this.addForm.reset();
  }

  close() {
    this.dialogRef.close();
  }

  onGroupSelected(group: any) {
    this.selectedGroup = group;
    // console.log(group);
  }

  /**
   * Submit form if is valid
   */
  onSubmit() {
    if (!this.addForm.valid) {
      // Check before..
      this.valido.validateAllFormFields(this.addForm);
      return;
    }
    let newEvent: EventDto = this.addForm.getRawValue();
    newEvent.eventId = '';
    console.log(newEvent);

    this.apiEvents.createEventUsingPOST(newEvent).subscribe((data) => {
      this.dialogRef.close({ result: 'ok' });
      this.showSnack('Добавихте събитие успешно.', 'ok', 2128);
    });
  }
}
