import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { EventWL } from 'src/app/model/event.model';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent extends BaseComponent implements OnInit {
  disableEdit: boolean = false;
  displayedColumns = ['id', 'type', 'subject', 'starDateTime', 'endDateTime', 'edit', 'delete'];
  events: EventWL[] = [];

  constructor(app: AppComponent, ar: ActivatedRoute, public dialog: MatDialog,) {
    super(ar);
  }

  ngOnInit(): void {
  }

  addEvent() {
    this.router.navigate(['home/list-event/add-event']);
  }

  editEvent(event: EventWL) {
    alert('open dialog for edit  - Not implemented yet')
  }

  deleteEvent(event: EventWL) {
    alert('logic for delete')
  }

  openRoom() {
    this.router.navigate(['home/list-event/room']);
  }
}
