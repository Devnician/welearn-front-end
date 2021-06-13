import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput
} from '@fullcalendar/angular';
import bgLocale from '@fullcalendar/core/locales/bg';
import {
  EventControllerService,
  EventDto,
  GroupControllerService,
  GroupDto,
  ScheduleDto
} from 'libs/rest-client/src';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { MenuOptions } from 'src/app/model/menu.model';
import { ProcessTypes } from 'src/app/utils/process-enum';
import { AddEventComponent } from '../add-event/add-event.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import EVENT_TYPES from '../event-types';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
// https://fullcalendar.io/docs/angular
// npm i --save @fullcalendar/core
// npm install --save @fullcalendar/angular @fullcalendar/daygrid
// npm install --save @fullcalendar/angular @fullcalendar/daygrid @fullcalendar/timegrid
export class CalendarComponent extends BlitcenComponent implements OnInit {
  myEvents: EventDto[] = [];
  upcomingEvents: EventDto[] = [];
  locales = [bgLocale /*, enLocale*/]; // bind to app locale

  // calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: bgLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //  eventDragStart: this.startDrag.bind(this),
    //  eventDragStop: this.storpDrag.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];
  gorups: BehaviorSubject<any> = new BehaviorSubject(null);
  gorups$ = this.gorups as Observable<GroupDto[]>;
  //  canEditThi$: BehaviorSubject<String> = new BehaviorSubject('observer');
  //  canEditThis = this.canEditThi$ as Observable<boolean>;
  // processMode: ProcessTypes = ProcessTypes.PREVIEW;

  // canEdit = false;
  // canCreate;
  cm: MenuOptions;
  constructor(
    private dialog: MatDialog,
    injector: Injector,
    private apiEvents: EventControllerService,
    // private apiGroups: GroupControllerService,
    private s: MatSnackBar
  ) {
    super(injector, s);
    this.addAuthorizationToService(apiEvents);
    // this.addAuthorizationToService(apiGroups);
    this.cm = AppComponent.myapp.getCurrentMenuObject(this.router.url);
  }

  ngOnInit(): void {
    this.loadGroups();
    this.gorups$.subscribe((data) => {
      if (data) {
        this.letShowEvents();
      }
    });
  }

  loadGroups() {
    this.apiGroups.findAllUsingGET2().subscribe((result) => {
      this.gorups.next(result);
    });
  }

  letShowEvents() {
    const showEvents: EventInput[] = [];
    this.apiEvents.findAllUsingGET1().subscribe((data) => {
      this.myEvents = data;
      // title: 'ООП, тип: Лекция ',
      //   start: moment().add(-2, 'days').startOf('day').add(9, 'hour').toISOString(), // TODAY_STR + 'T08:00:00',
      //   color: 'red',

      this.myEvents.forEach((eventDto) => {
        showEvents.push({
          editable: false,
          title: '(' + eventDto.type + ') ' + eventDto.discipline.name,
          extendedProps: {
            eventDto,
          },
          borderColor: 'white',
          textColor: '#696969',
          start: moment(eventDto.startDate).toDate(),
          end: moment(eventDto.endDate).toDate(),
          color: this.getColorForThisEvent(EVENT_TYPES[eventDto.type]),
          display: eventDto.type,
        });
      });
      this.calendarOptions.events = showEvents;

      const today: moment.Moment = moment().startOf('day');
      this.upcomingEvents = this.myEvents.filter((e) =>
        today.isBefore(e.startDate)
      );
      this.upcomingEvents.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    });
  }

  getColorForThisEvent(type: EVENT_TYPES): string {
    switch (type) {
      case EVENT_TYPES.Consultation:
        return '#00BFFF';
      case EVENT_TYPES.Exam:
        return '#F08080';
      case EVENT_TYPES.Exercise:
        return '#BDB76B';
      case EVENT_TYPES.Lection:
        return '#7FFFD4';
      default:
        return 'yellow';
    }
  }
  // startDrag(event: any) {
  //   console.log('DRAG START');
  //   console.log(event);
  // }

  // storpDrag(event: any) {
  //   console.log('DRAG STOP');
  //   console.log(event);
  // }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  /**
   * The date was clisked - add new event=
   * @param selectInfo arg
   */
  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (this.cm.add === false) {
      this.showSnack(
        'Не е възможно да добавяте събития в графика',
        'Разбрах',
        3000
      );
      return;
    }

    if (moment(selectInfo.start).isBefore(moment())) {
      this.showSnack(
        'Не е възможно създаване на събитие за изминал период.',
        'Разбрах',
        3333
      );
      return;
    }
    const newEvent: EventDto = {
      type: 'type',
      endDate: null,
      startDate: selectInfo.start,
      name: '',
      eventId: null,
      groupId: null,
    };

    this.openEventDialog({
      mode: ProcessTypes.CREATE,
      eventDto: newEvent,
      group: undefined,
      opt: this.cm,
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  /**
   * The event was clicked - open edit dialog.
   */
  handleEventClick(clickInfo: EventClickArg) {
    const ev: EventApi = clickInfo.event;
    const dto = ev._def.extendedProps.eventDto;

    this.openEventDialog({
      mode: ProcessTypes.UPDATE,
      eventDto: dto,
      group: this.gorups.value.find((e) => e.groupId === dto.groupId),
      opt: this.cm,
    });
  }

  previewOrEdit(dto: any) {
    this.openEventDialog({
      mode: ProcessTypes.UPDATE,
      eventDto: dto,
      group: this.gorups.value.find((e) => e.groupId === dto.groupId),
      opt: this.cm,
    });
  }

  private openEventDialog(bundle: any): void {
    const config = new MatDialogConfig();
    config.closeOnNavigation = false;
    config.data = bundle;
    const dialogRef = this.dialog.open(AddEventComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.letShowEvents();
    });
  }

  /**
   * Opend dialog for chedule generator.
   * @param data The ScheduleDto
   */
  openScheduleDialog(data: ScheduleDto): void {
    const config = new MatDialogConfig();
    config.closeOnNavigation = false;
    config.data = data;
    config.width = '80vw';
    
    const dialogRef = this.dialog.open(EditScheduleComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('do something');
      if (result) {
        this.letShowEvents();
      }
    });
  }

  openRoom() { 
    this.router.navigate(['home/list-event/room']);
  }
}
