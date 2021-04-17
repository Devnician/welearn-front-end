import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular';
import bgLocale from '@fullcalendar/core/locales/bg';
import { INITIAL_EVENTS } from './event-util';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  locales = [bgLocale/*, enLocale*/];
  // @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  //calendar: Calendar;
  ngOnInit(): void {
    // this.calendar = new Calendar();
    // let calendar = new Calendar(calendarEl, {
    //   locales: [ esLocale, frLocale ],
    //   locale: 'fr' // the initial locale. of not specified, uses the first one
    // });
  }

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
    // events: [
    //   { title: 'Изпит по ООП', date: '2021-04-19' },
    //   { title: 'Лекция по Бази данни', date: '2021-04-17' }
    // ]
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: '111111',
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo);
    alert(clickInfo);
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }




  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   weekends: true,
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  //   eventsSet: this.handleEvents.bind(this),
  //   events: [
  //     { title: 'Изпит по ООП', date: '2021-04-19' },
  //     { title: 'Лекция по Бази данни', date: '2021-04-17' }
  //   ]
  // };


  // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  //   eventsSet: this.handleEvents.bind(this)

  // constructor(private dialog: MatDialog) { }

  // ngOnInit(): void {
  // }



  // handleDateClick(arg) {

  //   console.log(arg)
  //   alert('date click! ' + arg.dateStr)
  // }

  // currentEvents: EventApi[] = [];

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents = events;
  // }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt("Please enter a new title for your event");
  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: '11111',
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     });
  //   }
  // }
  // handleEventClick(clickInfo: EventClickArg) {
  //   console.log(clickInfo);

  //   this.openDialog();

  // }

  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogEventsComponent, {
  //     width: 'auto', //90vw
  //     height: 'auto',
  //     panelClass: 'my-full-screen-dialog',
  //     data: { name: 'add', event: event }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result); //TODO ADD result in list 
  //   });
  // }

}
