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
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { MenuOptions } from 'src/app/model/menu.model';
import { ProcessTypes } from 'src/app/utils/process-enum';
import EVENT_TYPES from '../event-types';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent extends BlitcenComponent implements OnInit {
  addForm: FormGroup;
  eventTypes = EVENT_TYPES;
  selected: EVENT_TYPES.Lection;
  groups: GroupDto[] = [];
  owners: UserDto[] = [];

  selectedGroup: GroupDto;
  selectedDiscipline: DisciplineDto;
  selectedDisciplines: DisciplineDto[];
  currentMode = ProcessTypes.PREVIEW;
  currentEvent: EventDto;
  eventStartDateTime: Date;
  eventEndDateTime: Date;
  canEditThi$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  canEditThis = this.canEditThi$ as Observable<boolean>;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public bundle: any,
    private dialogRef: MatDialogRef<AddEventComponent>,
    private apiEvents: EventControllerService,
    // private apiGroups: GroupControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiEvents);
    // this.addAuthorizationToService(this.apiGroups);
  }

  ngOnInit(): void {
    this.apiGroups.findAllUsingGET2().subscribe((data) => {
      this.groups = data;
    });

    this.currentMode = this.bundle.mode;
    const evDTO = this.bundle.eventDto;
    evDTO.group = this.bundle.group;
    this.canUserEditThisEvent(this.bundle.opt);

    if (this.currentMode !== ProcessTypes.CREATE) {
      this.selectedGroup = evDTO.group;
      this.selectedDisciplines = this.selectedGroup.disciplines;
      this.eventStartDateTime = moment(evDTO.startDate).toDate();
      this.eventEndDateTime = moment(evDTO.endDate).toDate();
    } else {
      this.eventStartDateTime = moment(evDTO.startDate)
        .startOf('day')
        .add(8, 'hour')
        .toDate();
      this.eventEndDateTime = moment(evDTO.startDate)
        .startOf('day')
        .add(9, 'hour')
        .toDate();
    }

    const hasValues = this.currentMode !== ProcessTypes.CREATE;
    this.addForm = this.formBuilder.group({
      eventId: [hasValues ? evDTO.eventId : ''],
      type: [hasValues ? evDTO.type : null, Validators.required],
      name: [hasValues ? evDTO.name : null, Validators.required],
      startDate: [hasValues ? evDTO.startDate : null, Validators.required],
      endDate: [hasValues ? evDTO.endDate : null, Validators.required],
      description: [hasValues ? evDTO.description : null, Validators.required],
      discipline: [hasValues ? evDTO.discipline : null, Validators.required],
      group: [hasValues ? evDTO.group : null, Validators.required],
    });

    this.addForm.updateValueAndValidity();

    if (this.canEditThi$.value === false) {
      this.addForm.disable();
    }
  }
  /**
   * Double check..
   */
  canUserEditThisEvent(options: MenuOptions) {
    switch (this.user.role.role) {
      case 'administrator':
        this.canEditThi$.next(true);
        break;
      case 'teacher':
        // todo add creator check
        this.canEditThi$.next(options.preview === false);
        break;
      case 'student':
      case 'observer':
        this.canEditThi$.next(options.preview === false);
        break;

      default:
        this.canEditThi$.next(false);
        break;
    }
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
    return option?.groupId === value?.groupId;
  }
  compareDisciplines(option: DisciplineDto, value: DisciplineDto): boolean {
    return option?.id === value?.id;
  }
  reset() {
    this.addForm.reset();
  }
  close() {
    this.dialogRef.close();
  }
  onGroupSelected(group: any) {
    this.selectedGroup = group;
    this.selectedDisciplines = this.selectedGroup.disciplines;
  }

  /**
   * Submit form if is valid
   */
  onSubmit() {
    this.addForm.controls.startDate.setErrors(null);
    this.addForm.controls.endDate.setErrors(null);
    this.addForm.updateValueAndValidity();
    if (!this.addForm.valid) {
      this.valido.validateAllFormFields(this.addForm);
      return;
    }

    const result: any = this.addForm.getRawValue();
    result.groupId = result.group.groupId;
    result.disciplineId = result.discipline.disciplineId;
    const ev: EventDto = result as EventDto;

    switch (this.currentMode) {
      case ProcessTypes.CREATE:
        ev.eventId = '';
        if (moment(ev.startDate).isAfter(ev.endDate)) {
          this.addForm.controls.startDate.setErrors({ incorrect: true });
          this.addForm.controls.endDate.setErrors({ incorrect: true });
          this.showSnack(
            'Времето за начало е след времето за край.',
            'Разбрах',
            3456
          );
          return;
        }

        this.apiEvents.createEventUsingPOST(ev).subscribe((data) => {
          this.dialogRef.close({ result: 'ok' });
          this.showSnack('Добавихте събитие успешно.', 'ok', 2128);
        });
        break;
      case ProcessTypes.UPDATE:
        this.apiEvents.editEventUsingPUT(ev).subscribe((data) => {
          this.dialogRef.close({ result: 'ok' });
          this.showSnack('Пременихте данни за събитие успешно.', 'ok', 2128);
        });
        break;

      default:
        break;
    }
  }

  getMinutesFromMidnightOfThisDate(m: moment.Moment): number {
    const mmtMidnight = m.clone().startOf('day');
    const diffMinutes = m.diff(mmtMidnight, 'minutes');
    return diffMinutes;
  }
}
