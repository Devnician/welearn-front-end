import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/angular';
import bgLocale from '@fullcalendar/core/locales/bg';
import { EventDto, ScheduleDto } from 'libs/rest-client/src';
import * as moment from 'moment';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import { INITIAL_EVENTS } from './event-util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent
  extends BlitcenComponent
  implements OnInit, AfterViewInit
{
  autoSchedule: ScheduleDto[] = [
    {
      groupId: 'adsasd',
      disciplineId: 'asdasd',
      startTime: moment().toDate(),
      endTime: moment().toDate(),
    },
  ];

  // https://fullcalendar.io/docs/angular
  // npm i --save @fullcalendar/core
  // npm install --save @fullcalendar/angular @fullcalendar/daygrid
  // npm install --save @fullcalendar/angular @fullcalendar/daygrid @fullcalendar/timegrid

  locales = [bgLocale /*, enLocale*/]; // bind to app locale

  //calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: bgLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, //this.loadEvents(), // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDragStart: this.startDrag.bind(this),
    eventDragStop: this.storpDrag.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private dialog: MatDialog, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadMyAutoSchedule();

    this.apiEvents.findAllUsingGET1().subscribe((data) => {
      console.log(data);
    });
  }

  loadMyAutoSchedule() {
    const sch: ScheduleDto = {
      groupId: 'adsasd',
      disciplineId: 'asdasd',
      startTime: moment().toDate(),
      endTime: moment().toDate(),
    };

    this.autoSchedule.push(sch);
    this.autoSchedule.push(sch);
    this.autoSchedule.push(sch);
    this.autoSchedule.push(sch);
    // console.log(this.autoSchedule);
  }
  ngAfterViewInit(): void {
    // this.allEvents.next(this.currentEvents.length);
  }

  loadEvents(): EventInput[] {
    // map EventDto to EventInput[]
    return INITIAL_EVENTS;
  }

  startDrag(event: any) {
    console.log('DRAG START');
    console.log(event);
  }

  storpDrag(event: any) {
    console.log('DRAG STOP');
    console.log(event);
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  /**
   * The date was clisked - add new event=
   * @param selectInfo arg
   */
  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    let newEvent: EventDto = {
      type: 'type',
      endDate: null,
      startDate: null,
      name: '',
      eventId: null,
      groupId: null,
    };
    this.openEventDialog(newEvent);
  }
  /**
   * The event was clicked - edit mode.
   * @param clickInfo
   */
  handleEventClick(clickInfo: EventClickArg) {
    const ev: EventApi = clickInfo.event;
    console.log(clickInfo.event);

    const newEvent: EventDto = {
      type: 'type',
      endDate: null,
      startDate: null,
      name: ev._def.title,
      eventId: null,
      groupId: null,
    };
    this.openEventDialog(newEvent);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  private openEventDialog(data: EventDto): void {
    const config = new MatDialogConfig();
    config.closeOnNavigation = true;
    config.data = data;
    const dialogRef = this.dialog.open(AddEventComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('do something');
    });
  }

  // private openEditDialog(data: EventDto): void {
  //   const config = new MatDialogConfig();
  //   config.closeOnNavigation = true;
  //   config.data = data;
  //   const dialogRef = this.dialog.open(EditEventComponent, config);
  //   dialogRef.afterClosed().subscribe();
  // }

  openScheduleDialog(data: ScheduleDto): void {
    const config = new MatDialogConfig();
    config.closeOnNavigation = true;
    config.data = data;
    // config.width = '40vw';
    // config.height = 'fit-content';
    const dialogRef = this.dialog.open(EditScheduleComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('do something');
    });
  }
}
