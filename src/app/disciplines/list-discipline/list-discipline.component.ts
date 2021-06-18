import { Component, ContentChild, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatNoDataRow } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DisciplineControllerService, GroupDto } from 'libs/rest-client/src';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { MenuOptions } from 'src/app/model/menu.model';
import { CollectionsUtil } from 'src/app/utils/collections-util';
import { ProcessTypes } from 'src/app/utils/process-enum';

@Component({
  selector: 'app-list-discipline',
  templateUrl: './list-discipline.component.html',
  styleUrls: ['./list-discipline.component.scss'],
})
export class ListDisciplineComponent extends BaseComponent implements OnInit {
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  displayedColumns = ['name', 'lector', 'assistant', 'resources', 'actions'];
  disciplines: Discipline[] = [];
  collectionsUtil: CollectionsUtil;
  groups: GroupDto[];
  disableEdit = false;
  cm: MenuOptions;

  constructor(
    ar: ActivatedRoute,
    private donkey: DonkeyService,
    injector: Injector,
    private apiDisciplines: DisciplineControllerService,
    private s: MatSnackBar
  ) {
    super(ar, injector, s);
    this.addAuthorizationToService(apiDisciplines);
    this.cm = AppComponent.myapp.getCurrentMenuObject(this.router.url);
  }

  ngOnInit(): void {
    // this.app.users.filter(x => array.indexOf(x.id) !== -1)

    this.apiDisciplines.getDisciplinesUsingGET().subscribe((data) => {
      this.disciplines = data as Discipline[];
      this.loadPaginator(this.disciplines, 'name');
      // TODO
      // FILTER DISCIPLINES ACCORDING USER ID
      // show only the disciplines in which this user is involved
    });

    // if (this.user.roleId === 2) {
    //   this.disciplines = this.app.disciplines.filter(d => (d.lector?.userId ===
    // this.user.userId || d.assistant?.userId === this.user.userId));
    // } else if (this.user.roleId === 3) {
    //   this.disableEdit = true;
    //   this.groups = this.collectionsUtil.getGroups();
    //   this.groups = this.groups.filter(gr => (gr.students.findIndex(st => st.userId === this.user.userId) !== -1));
    //   let array = [];
    //   this.groups.forEach(group => {
    //     group.disciplines.forEach(disc => {
    //       array.push(disc.id);
    //     })
    //   });
    //   this.disciplines = this.disciplines.filter(user => array.indexOf(user.id) !== -1);
    // }
  }

  editDiscipline(discipline: Discipline) {
    let processType = ProcessTypes.CREATE;
    let prefix = '';
    if (discipline === null || discipline === undefined) {
      processType = ProcessTypes.CREATE;
      prefix = 'Създаване';
    } else {
      if (this.cm.preview === true) {
        processType = ProcessTypes.PREVIEW;
        prefix = 'Преглед';
      } else {
        processType = ProcessTypes.UPDATE;
        prefix = 'Редактиране';
      }
    }
    this.donkey.setData({ prefix, processType, discipline });
    this.router.navigate(['home/list-discipline/edit-discipline']);
  }
}
