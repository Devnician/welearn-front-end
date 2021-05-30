import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DisciplineDto,
  EventControllerService,
  EventDto,
  GroupControllerService,
  GroupDto,
  UserDto,
} from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
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

  // selectedDisciplines: DisciplineDto[] = [];
  selectedGroup: GroupDto;
  selectedDiscipline: DisciplineDto;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public bundle: any,
    private dialogRef: MatDialogRef<AddEventComponent>,
    private apiEvents: EventControllerService,
    private apiGroups: GroupControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiEvents);
    this.addAuthorizationToService(apiGroups);
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
    const evDTO = this.bundle.eventDto;
    evDTO.group = this.bundle.group;

    console.log(this.bundle);
    // this.selectedGroup = this.bundle.group;

    this.isEditMode = evDTO.eventId?.length > 0;
    if (this.isEditMode === true) {
      this.selectedGroup = evDTO.group;
      console.log(this.selectedGroup);
      this.selectedDiscipline = evDTO.discipline;
      //  this.selectedDisciplines = this.selectedGroup.disciplines;
    }

    console.log('Is edit MODE ' + this.isEditMode);

    console.log(evDTO);
    this.addForm = this.formBuilder.group({
      id: [this.isEditMode ? evDTO.eventId : ''],

      type: [this.isEditMode ? evDTO.type : null, Validators.required],

      name: [this.isEditMode ? evDTO.name : null, Validators.required],
      startDate: [
        this.isEditMode ? evDTO.startDate : null,
        Validators.required,
      ],
      endDate: [this.isEditMode ? evDTO.endDate : null, Validators.required],
      description: [
        this.isEditMode ? evDTO.description : null,
        Validators.required,
      ],

      group: [this.isEditMode ? evDTO.group : null, Validators.required],
      discipline: [
        this.isEditMode ? evDTO.discipline : null,
        Validators.required,
      ],
    });

    this.addForm.updateValueAndValidity();

    console.log(this.addForm.value);

    // this.addForm.controls.type.setValue(EVENT_TYPES.Lection);
  }

  /**
   * Checks field
   * @param field the field
   * return True if it is valed false otherwise
   */
  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && this.addForm.get(field).touched;
  }
  // MAT SELECT  COMPARATORS
  compareGroups(option: GroupDto, value: GroupDto): boolean {
    return option.groupId === value.groupId;
  }
  compareDisciplines(option: DisciplineDto, value: DisciplineDto): boolean {
    return option.id === value.id;
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
    const newEvent: EventDto = this.addForm.getRawValue();
    newEvent.eventId = '';
    console.log(newEvent);

    this.apiEvents.createEventUsingPOST(newEvent).subscribe((data) => {
      this.dialogRef.close({ result: 'ok' });
      this.showSnack('Добавихте събитие успешно.', 'ok', 2128);
    });
  }
}
