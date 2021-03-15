import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { StudentsGroup } from 'src/app/model/students-group.model';
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
  studentGroup: StudentsGroup;
  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'mark', 'remove'];


  constructor(app: AppComponent, ar: ActivatedRoute, private donkey: DonkeyService) {
    super(ar);
    this.studentGroup = donkey.getData();
  }

  ngOnInit(): void {
    if (!this.studentGroup) {
      alert('Group is null');
    } else {
      console.log(this.studentGroup);
      this.loadPaginator(this.studentGroup.students, 'firstName');
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
    alert('show marks..');
  }

}
