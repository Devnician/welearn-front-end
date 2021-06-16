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
  ResourceControllerService,
  UserDto
} from 'libs/rest-client/src';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { MenuOptions } from 'src/app/model/menu.model';
import { FileUtil } from 'src/app/utils/file-util';
import { ProcessTypes } from 'src/app/utils/process-enum';
import EVENT_TYPES from '../event-types';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent extends BlitcenComponent implements OnInit {
  fileUtil: FileUtil;
  addForm: FormGroup;
  eventTypes = EVENT_TYPES;
  selected: EVENT_TYPES.Class;
  groups: GroupDto[] = [];
  owners: UserDto[] = [];

  selectedGroup: GroupDto;
  selectedDiscipline: DisciplineDto;
  selectedDisciplines: DisciplineDto[];
  processType = ProcessTypes.PREVIEW;
  currentEvent: any;

  canEditThi$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  canEditThis = this.canEditThi$ as Observable<boolean>;

  constructor(
    injector: Injector,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public bundle: any,
    private dialogRef: MatDialogRef<AddEventComponent>,
    private apiEvents: EventControllerService,
    private resourceControllerService: ResourceControllerService,
    private apiGroups: GroupControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiEvents);
    this.addAuthorizationToService(apiGroups);
    this.addAuthorizationToService(resourceControllerService);
    this.fileUtil = new FileUtil(this.resourceControllerService, this);
    console.log(this.eventTypes);
  }

  ngOnInit(): void {
    console.log(this.bundle), this.eventTypes;
    this.apiGroups.findAllUsingGET2().subscribe((data) => {
      this.groups = data;
    });

    this.processType = this.bundle.mode;
    this.currentEvent = this.bundle.eventDto;
    this.currentEvent.group = this.bundle.group;
    this.canUserEditThisEvent(this.bundle.opt);
    let eventStartDateTime: Date;
    let eventEndDateTime: Date;
    console.log(this.processType);

    if (this.processType !== ProcessTypes.CREATE) {
      this.selectedGroup = this.currentEvent.group;
      this.selectedDisciplines = this.selectedGroup.disciplines;
      eventStartDateTime = moment(this.currentEvent.startDate).toDate();
      eventEndDateTime = moment(this.currentEvent.endDate).toDate();

      let fileIds = this.currentEvent.resourceIds;
      if (fileIds.length > 0) {
        fileIds.forEach((file) => {
          this.resourceControllerService
            .getByIdUsingGET2(file)
            .subscribe((dto) => {
              this.fileUtil.push(dto);
              //this.resources.push(dto);
            });
        });
      }

    } else {
      eventStartDateTime = moment(this.currentEvent.startDate)
        .startOf('day')
        .add(8, 'hour')
        .toDate();
      eventEndDateTime = moment(this.currentEvent.startDate)
        .startOf('day')
        .add(9, 'hour')
        .toDate();
    }

    const hasValues = this.processType !== ProcessTypes.CREATE;
    this.addForm = this.formBuilder.group({
      eventId: [hasValues ? this.currentEvent.eventId : ''],
      type: [hasValues ? this.currentEvent.type : null, Validators.required],
      name: [hasValues ? this.currentEvent.name : null, Validators.required],
      startDate: [
        hasValues ? this.currentEvent.startDate : null,
        Validators.required,
      ],
      endDate: [
        hasValues ? this.currentEvent.endDate : null,
        Validators.required,
      ],
      description: [
        hasValues ? this.currentEvent.description : null,
        Validators.required,
      ],
      discipline: [
        hasValues ? this.currentEvent.discipline : null,
        Validators.required,
      ],
      group: [hasValues ? this.currentEvent.group : null, Validators.required],
    });

    this.addForm.controls.startDate.setValue(eventStartDateTime);
    this.addForm.controls.endDate.setValue(eventEndDateTime);

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
  goToClassRoom() { 
    this.dialogRef.close({ result: 'ok' ,class: this.currentEvent});
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
    const ev: any = result as EventDto;
    console.log(ev);

    switch (this.processType) {
      case ProcessTypes.CREATE:
        ev.eventId = undefined;
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

        ev.startDate = moment(ev.startDate).format('yyyy-MM-DD HH:mm:ss');
        ev.endDate = moment(ev.endDate).format('yyyy-MM-DD HH:mm:ss');
        this.apiEvents.createEventUsingPOST(ev).subscribe((data) => {
          this.dialogRef.close({ result: 'ok' });
          this.showSnack('Добавихте събитие успешно.', 'ok', 2128);
        });
        break;
      case ProcessTypes.UPDATE:
        ev.startDate = moment(ev.startDate).format('yyyy-MM-DD HH:mm:ss');
        ev.endDate = moment(ev.endDate).format('yyyy-MM-DD HH:mm:ss');
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

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    let id = this.currentEvent.eventId;   
    this.fileUtil.onFileDropped($event,id, 'event');
  }
}
