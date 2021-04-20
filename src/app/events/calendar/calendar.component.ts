import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular';
import bgLocale from '@fullcalendar/core/locales/bg';
import { EventDto } from 'libs/rest-client/src';
import { AddEventComponent } from '../add-event/add-event.component';
import { INITIAL_EVENTS } from './event-util';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // https://fullcalendar.io/docs/angular 
  // npm i --save @fullcalendar/core
  // npm install --save @fullcalendar/angular @fullcalendar/daygrid
  // npm install --save @fullcalendar/angular @fullcalendar/daygrid @fullcalendar/timegrid 


  locales = [bgLocale/*, enLocale*/]; //bind to app locale

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: bgLocale,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    },
    initialView: "dayGridMonth",
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDragStart: this.startDrag.bind(this),
    eventDragStop: this.storpDrag.bind(this)

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  startDrag(event: any) {
    console.log('DRAG START')
    console.log(event)
  }

  storpDrag(event: any) {
    console.log('DRAG STOP')
    console.log(event)
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  /**
   * The date was clisked - add new event=
   * @param selectInfo 
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

    }
    this.openDialog(newEvent);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: '111111',
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }
  /**
   * The event was clicked - edit mode.
   * @param clickInfo 
   */
  handleEventClick(clickInfo: EventClickArg) {
    const ev: EventApi = clickInfo.event;
    console.log(clickInfo.event);

    let newEvent: EventDto = {
      type: 'type',
      endDate: null,
      startDate: null,
      name: ev._def.title,
      eventId: null,
      groupId: null,

    }
    this.openDialog(newEvent);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


  private openDialog(data: EventDto): void {
    const config = new MatDialogConfig();
    config.closeOnNavigation = true;
    config.data = data;
    const dialogRef = this.dialog.open(AddEventComponent, config);
    dialogRef.afterClosed().subscribe();
  }

  // private openEditDialog(data: EventDto): void {
  //   const config = new MatDialogConfig();
  //   config.closeOnNavigation = true;
  //   config.data = data;
  //   const dialogRef = this.dialog.open(EditEventComponent, config);
  //   dialogRef.afterClosed().subscribe();
  // }
}
