import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, ContentChild, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatNoDataRow } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DisciplineDto, EvaluationMarkDto, GroupDto, UserDto } from 'libs/rest-client/src';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { DialogModalComponent } from 'src/app/dialog-modal/dialog-modal.component';
import { Discipline } from 'src/app/model/discipline.model';
import { MenuOptions } from 'src/app/model/menu.model';
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
      transition('hide => show', animate('300ms ease-in')),
    ]),
    trigger('divCourseStatuses', [
      state('show', style({ height: 'auto', width: 'auto' })),
      state('hide', style({ height: '0vh', display: 'none' })),
      transition('show => hide', animate('200ms ease-out')),
      transition('hide => show', animate('300ms ease-in')),
    ]),
  ],
})
export class EditGroupComponent extends BaseComponent implements OnInit {
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

  studentGroup: GroupDto;
  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'actions'];
  cm: MenuOptions;
  studentsList: Array<UserDto>;

  constructor(
    ar: ActivatedRoute,
    private donkey: DonkeyService,
    public dialog: MatDialog,
    injector: Injector,
    private s: MatSnackBar
  ) {
    super(ar, injector, s);
    this.studentGroup = donkey.getData();
    this.cm = AppComponent.myapp.getCurrentMenuObject('/home/list-group');
   
console.log(this.cm)
    console.log(this.studentGroup);
  }

  ngOnInit(): void {
    if (!this.studentGroup) {
      alert('Group is null');
    } else {
      this.loadPaginator(this.studentGroup.users, 'firstName');
      console.log(this.paginator)
      this.apiUsers.listUserUsingGET().subscribe(
        data => {
          const students = data.filter(s => s.role.id === 3 && !s.groupId); //Take students only
          this.studentsList = students;
        }
      )

    }
  }
  addStudent() {
    alert('add sudent');
    // TODO - filter users and  open dialog with multi select

    // this.apiUsers.listUserUsingGET1(3).subscribe(data => {
    //   this.studentGroup.users = data;
    // });
  }

  removeStudent(userId: string) {
    alert('arer you sure');

    this.apiGroups.removeStudentFromGroupPUT(this.studentGroup.groupId, userId).subscribe(
      data => {
        this.studentGroup = data
        this.loadPaginator(this.studentGroup.users, 'firstName');
      })
  }

  addDiscipline() {
    // TODO open dialog with multiselect
    alert('not implemented yet');
  }

  editDiscipline(discipline: Discipline) {
    console.log(discipline);
    alert('edit ...');
  }

  showEvaluationMarks(user: UserDto) {
    const myDisciplines: DisciplineDto[] = this.studentGroup.disciplines.filter(
      (d) =>
        this.user.role.id === 1 || d.teacher?.userId === this.user.userId ||
        d.assistant?.userId === this.user.userId
    );
    this.openDialog(user, myDisciplines);
  }

  openDialog(user: UserDto, disciplines: DisciplineDto[]): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '40vw',
      height: 'fit-content',

      panelClass: 'my-full-screen-dialog',
      data: {
        obj: user,
        collection: disciplines,
        groupId: this.studentGroup.groupId,
        mode: 'edit',
        classType: 'marks',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result: ');
        console.log(result.data);
        const evaluationMarks: EvaluationMarkDto[] = result.data.disciplines;
        this.apiEvaluationMarks.createMarkUsingPOST(evaluationMarks).subscribe(
          () => this.apiGroups.findByIdUsingGET(this.studentGroup.groupId).subscribe(
            group => {
              this.studentGroup = group
              this.loadPaginator(this.studentGroup.users, 'firstName');
            }
          )
        )
      }
    });
  }

  onStudentSelect(userId: string) {
    console.log(this.studentGroup)
    this.apiGroups.saveStudentToGroupPUT(this.studentGroup.groupId, userId).subscribe(
      data => {
        this.studentGroup = data
        this.loadPaginator(this.studentGroup.users, 'firstName');

      }
    )
  }

}
