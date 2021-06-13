import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventControllerService, EventDto } from 'libs/rest-client/src';
import * as moment from 'moment';
import { BlitcenComponent } from '../blitcen/blitcen.component';
import { CollectionsUtil } from '../utils/collections-util';

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
    private eventService: EventControllerService,
    private collectionsUtil:CollectionsUtil
  ) {
    super(injector, s);
    this.addAuthorizationToService(eventService);
    
  }

  /**
   * Show only menu buttons in main screen for now
   */
  ngOnInit() {
    //this.menuOpt = AppComponent.myapp?.menuOptions; 

    this.eventService.findAllUsingGET1().subscribe((result) => {
      if (!result) {
        this.showSnack('Нямате предстоящи събития.', 'OK', 5000);
        return;
      }
      const res: EventDto[] = result;
      const today: moment.Moment = moment().startOf('day'); 
      this.upcomingEvents = res.filter((e) => today.isBefore(e.startDate)); 
      this.upcomingEvents = this.collectionsUtil.filterEventsAccordingUserRole(this.upcomingEvents, this.user);
      
      if (this.upcomingEvents.length === 0) {
        this.showSnack('Нямате предстоящи събития.', 'OK', 5000);
      } else {
        this.upcomingEvents.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      }
     
      this.show = false;
    }); 
  }
}
