import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { DialogModalComponent } from 'src/app/dialog-modal/dialog-modal.component';
import { Discipline } from 'src/app/model/discipline.model';
import { Group } from 'src/app/model/group.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  animations: [
    trigger('divState', [
      // state('show', style({ height: '100vh', width: '20vw' })),
      state('show', style({ height: 'auto', width: 'auto' })),
      state('hide', style({ height: '0vh', display: 'none' })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
    trigger('divStateDistrict', [
      state('show', style({ height: 'auto', width: 'auto' })),
      state('hide', style({ height: '0vh', display: 'none' })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
    trigger('divCourseStatuses', [
      state('show', style({ height: 'auto', width: 'auto' })),
      state('hide', style({ height: '0vh', display: 'none' })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ])
  ]
})
export class EditGroupComponent extends BaseComponent implements OnInit {
  studentGroup: Group;
  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'mark', 'remove'];


  constructor(ar: ActivatedRoute, private donkey: DonkeyService, public dialog: MatDialog, injector: Injector) {
    super(ar, injector);
    this.studentGroup = donkey.getData();
  }

  ngOnInit(): void {
    if (!this.studentGroup) {
      alert('Group is null');
    } else {
      console.log(this.studentGroup);
      this.loadPaginator(this.studentGroup.users, 'firstName');
    }
  }
  addStudent() {
    alert('add sudent');
  }

  removeStudent(user: User) {
    alert('arer you sure');
  }

  addDiscipline() {
    alert('not implemented yet');
  }

  editDiscipline(discipline: Discipline) {
    console.log(discipline);
    alert('edit ...');
  }

  showEvaluationMarks(user: User) {
    let myDisciplines: Discipline[] = this.studentGroup.disciplines.filter(d => (d.lector?.userId === this.user.userId || d.assistant?.userId === this.user.userId));
    this.openDialog(user, myDisciplines);
  }

  openDialog(user: User, disciplines: Discipline[]): void {

    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '40vw',
      height: 'fit-content',

      panelClass: 'my-full-screen-dialog',
      data: { obj: user, collection: disciplines, mode: 'edit', classType: 'marks' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result: ')
        console.log(result.data);
      }
    });
  }

}
