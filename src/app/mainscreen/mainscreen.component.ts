import { Component, OnInit } from '@angular/core';
import { BlitcenComponent } from '../blitcen/blitcen.component';

export class StatisticRow {
  objectId: number;
  one: any;
  two: any;
  three: any;
  four: any;
  five: any;
  six: any;
  seven: any;
  eight: any; 
}

export class Row {
  type: string;
  statys: any;
  counter: any;
}

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss']
})
export class MainscreenComponent extends BlitcenComponent implements OnInit {
  menuOpt: any; 
//  show = true; 
  constructor() {
    super();
  }

  /**
   * Show only menu buttons in main screen for now
   */
  ngOnInit() {
    this.menuOpt = this.app.menuOptions;  
  }
}
