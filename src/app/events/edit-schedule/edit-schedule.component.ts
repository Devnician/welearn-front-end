import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupDto, ScheduleDto } from 'libs/rest-client/src';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss'],
})
export class EditScheduleComponent extends BlitcenComponent implements OnInit {
  groupHeader: BehaviorSubject<string> = new BehaviorSubject('');
  groupHeader$ = this.groupHeader as Observable<string>;
  days = [
    { key: 'Monday', value: 'Понеделник' },
    { key: 'Tuesday', value: 'Вторник' },
    { key: 'Wednesday', value: 'Сряда' },
    { key: 'Thursday', value: 'Четвъртък' },
    { key: 'Friday', value: 'Петък' },
    { key: 'Saturday', value: 'Събота' },
    { key: 'Sunday', value: 'Неделя' },
  ];
  title = '';
  addForm: FormGroup;
  groups: GroupDto[] = [];
  minDate: any;
  maxDate: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ScheduleDto,
    private dialogRef: MatDialogRef<EditScheduleComponent>,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.title = 'Генериране на събития за група ';
    // TODO - this is for admin

    console.log(this.user.role);
    if (this.user.role.role === 'administrator') {
      this.apiGroups.findAllUsingGET2().subscribe((result) => {
        this.groups = result;
      });
    } else {
      //TODO - find groups for this user(only teacher can see this!)
    }

    this.buildFrorm();
  }
  buildFrorm() {
    this.addForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      dayOfWeek: ['', Validators.required],
      startHour: [moment().startOf('day').add(8, 'hours'), Validators.required],
      endHour: [moment().startOf('day').add(10, 'hours'), Validators.required],
      group: [null, Validators.required],
      discipline: [null, Validators.required],
    });

    // Control for Smart Users
    this.addForm.controls.startDate.valueChanges.subscribe((value) => {
      if (moment(value).isAfter(moment(this.addForm.controls.endDate.value))) {
        this.addForm.controls.startDate.patchValue(
          this.addForm.controls.endDate.value
        );
        this.addForm.controls.startDate.updateValueAndValidity();
        this.addForm.controls.endDate.patchValue(value);
        this.addForm.controls.endDate.updateValueAndValidity();
      }
    });
    this.addForm.controls.endDate.valueChanges.subscribe((value) => {
      if (
        moment(this.addForm.controls.startDate.value).isAfter(moment(value))
      ) {
        this.addForm.controls.endDate.patchValue(
          this.addForm.controls.startDate.value
        );
        this.addForm.controls.endDate.updateValueAndValidity();
        this.addForm.controls.startDate.patchValue(value);
        this.addForm.controls.startDate.updateValueAndValidity();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
  reset() {
    alert('clear form');
  }
  onSubmit() {
    let result = this.addForm.getRawValue();
    result.startHour = moment(result.startHour).format('HH:MM').toString();
    result.endHour = moment(result.endHour).format('HH:MM').toString();
    console.log(result);
  }

  groupSelected(group: GroupDto) {
    console.log(group);

    if (!group) {
      this.groupHeader.next('');
      this.minDate = undefined;
      this.maxDate = undefined;
      this.addForm.reset();
    } else {
      this.minDate = moment(group.startDate)
        .startOf('day')
        .subtract(1, 'milliseconds')
        .toDate();
      this.maxDate = moment(group.endDate)
        .endOf('day')

        .toDate();
      this.groupHeader.next(
        '" ' +
          group.name +
          '" - (' +
          group.startDate +
          ' - ' +
          group.endDate +
          ')'
      );
    }
    // console.log(this.groupDescription);
  }

  timeChangeHandler(e: any) {
    console.log(e);
  }

  getMinutesFromMidnightToThisMoment(m: moment.Moment): number {
    var mmtMidnight = m.clone().startOf('day');
    var diffMinutes = m.diff(mmtMidnight, 'minutes');
    return diffMinutes;
  }

  isDateCorrect(): boolean {
    let isValid: boolean =
      this.addForm.controls.startDate.errors?.length > 0 ||
      this.addForm.controls.endDate.errors?.length > 0;
    if (isValid) {
      this.addForm.controls.startDate.updateValueAndValidity();
      this.addForm.controls.endDate.updateValueAndValidity();
    }
    return isValid;
  }
}
