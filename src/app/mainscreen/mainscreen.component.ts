import { Component, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { BlitcenComponent } from '../blitcen/blitcen.component';

export class EventsRow {
  type: any;
  date: any;
  discipline: any;
}

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
})
export class MainscreenComponent extends BlitcenComponent implements OnInit {
  rows: EventsRow[] = [];
  menuOpt: any;
  show = true;
  constructor(injector: Injector, private s: MatSnackBar) {
    super(injector, s);
  }

  /**
   * Show only menu buttons in main screen for now
   */
  ngOnInit() {
    this.menuOpt = AppComponent.myapp?.menuOptions;
    this.rows.push({ type: 'eventType', date: new Date(), discipline: 'DB' });
    this.show = false;
  }
}
