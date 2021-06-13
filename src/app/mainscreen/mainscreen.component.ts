import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventControllerService, EventDto } from 'libs/rest-client/src';
import * as moment from 'moment';
import { AppComponent } from '../app.component';
import { BlitcenComponent } from '../blitcen/blitcen.component';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
})
export class MainscreenComponent extends BlitcenComponent implements OnInit {
  upcomingEvents: EventDto[] = [];
  menuOpt: any;
  show = true;

  constructor(
    injector: Injector,
    private s: MatSnackBar,
    private eventService: EventControllerService
  ) {
    super(injector, s);
    this.addAuthorizationToService(eventService);
  }

  /**
   * Show only menu buttons in main screen for now
   */
  ngOnInit() {
    this.menuOpt = AppComponent.myapp?.menuOptions;
    this.show = false;

    this.eventService.findAllUsingGET1().subscribe((result) => {
      if (!result) {
        this.showSnack('Нямате предстоящи събития.', 'OK', 2000);
        return;
      }
      const res: EventDto[] = result;
      const today: moment.Moment = moment().startOf('day');
      this.upcomingEvents = res.filter((e) => today.isBefore(e.startDate));
      console.log(this.user.userId);
      this.upcomingEvents = this.upcomingEvents.filter(ev =>
        ev.discipline.teacher.userId === this.user.userId  || ev.discipline.assistant.userId === this.user.userId
      );
      console.log(this.upcomingEvents);

      this.upcomingEvents.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    });

    // this.rows.push({ type: 'eventType', date: new Date(), discipline: 'DB' });
  }
}
