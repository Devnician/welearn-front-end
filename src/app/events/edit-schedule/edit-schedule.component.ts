import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupDto, ScheduleDto } from 'libs/rest-client/src';
import * as moment from 'moment';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss'],
})
export class EditScheduleComponent extends BlitcenComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ScheduleDto,
    private dialogRef: MatDialogRef<EditScheduleComponent>,
    private injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.title = 'Генериране на събития за група';
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
  timeChangeHandler(e: any) {
    console.log(e);
  }

  getMinutesFromMidnightToThisMoment(m: moment.Moment): number {
    var mmtMidnight = m.clone().startOf('day');
    var diffMinutes = m.diff(mmtMidnight, 'minutes');
    return diffMinutes;
  }
}
