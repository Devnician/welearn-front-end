import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDateFormatter, CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView, DAYS_OF_WEEK
} from 'angular-calendar';
import {
  addDays,
  addHours,
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfDay,
  subDays
} from 'date-fns';
import { Subject } from 'rxjs';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { AddEditEventComponent } from '../add-edit-event/add-edit-event.component';
import { CustomDateFormatter } from './custom-date-formatter.provider';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // styleUrls: ['styles.css'],
  //https://stackblitz.com/edit/angular-6su8pq?file=demo%2Fcomponent.ts
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})

export class CalendarComponent extends BlitcenComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  // view: string = 'month';
  // viewDate: Date = new Date();
  // events: CalendarEvent[] = [];

  locale: string = 'bg';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.MONDAY, DAYS_OF_WEEK.SUNDAY];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Добавяне на събитие',// A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true
    // },
    {
      start: addHours(startOfDay(new Date()), 8),
      end: addHours(startOfDay(new Date()), 9),
      title: 'A draggable and resizable event 1 ',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }, {
      start: addHours(startOfDay(new Date()), 10),
      end: addHours(startOfDay(new Date()), 11),
      title: 'A draggable and resizable event 2 ',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private injector: Injector, private dialog: MatDialog) {
    super(injector);
  }


  /**
   * 
   * @param param0 
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    //console.log('DAY CLICKED: ' + date);

    //  this.showSnack('DAY CLICKED: ' + date + ' , events: ' + events.length, "", 1500);
    if (events.length === 0) {
      const dialogRef = this.dialog.open(AddEditEventComponent, {
        width: '250px',
        data: { name: 'add', event: null }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result); //TODO ADD result in list
      });
    }

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;

      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;

    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {

    console.log(event);
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Часовете на събитието са променени.Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {


    const dialogRef = this.dialog.open(AddEditEventComponent, {
      width: '250px',
      data: { name: 'add', event: event }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result); //TODO ADD result in list
    });

    //TODO USE THIS
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });

  }

  addEvent(): void {
    console.log('ADD EVENT');
    console.log(this.events);

    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];

    console.log(this.events);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}


