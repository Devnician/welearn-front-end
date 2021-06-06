import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EventDto } from 'libs/rest-client/src';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
})
export class ListEventComponent extends BaseComponent implements OnInit {
  disableEdit = false;
  displayedColumns = [
    'id',
    'type',
    'subject',
    'starDateTime',
    'endDateTime',
    'edit',
    'delete',
  ];
  events: EventDto[] = [];

  constructor(
    ar: ActivatedRoute,
    public dialog: MatDialog,
    injector: Injector,
    private s: MatSnackBar
  ) {
    super(ar, injector, s);
  }

  ngOnInit(): void {}

  addEvent() {
    this.router.navigate(['home/list-event/add-event']);
  }

  editEvent(event: EventDto) {
    alert('open dialog for edit  - Not implemented yet');
  }

  deleteEvent(event: EventDto) {
    alert('logic for delete');
  }

  openRoom() {
    this.router.navigate(['home/list-event/room']);
  }
}
