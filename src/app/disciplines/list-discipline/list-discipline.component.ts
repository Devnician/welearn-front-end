import { Component, ContentChild, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatNoDataRow } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DisciplineControllerService, GroupDto } from 'libs/rest-client/src';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { CollectionsUtil } from 'src/app/utils/collections-util';

@Component({
  selector: 'app-list-discipline',
  templateUrl: './list-discipline.component.html',
  styleUrls: ['./list-discipline.component.scss'],
})
export class ListDisciplineComponent extends BaseComponent implements OnInit {
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  displayedColumns = ['name', 'lector', 'assistant', 'actions'];
  disciplines: Discipline[] = [];
  collectionsUtil: CollectionsUtil;
  groups: GroupDto[];
  disableEdit = false;

  constructor(
    ar: ActivatedRoute,
    private donkey: DonkeyService,
    injector: Injector,
    private apiDisciplines: DisciplineControllerService,
    private s: MatSnackBar
  ) {
    super(ar, injector, s);
    this.addAuthorizationToService(apiDisciplines);
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

  addDiscipline() {
    this.router.navigate(['home/list-discipline/add-discipline']);
  }

  editDiscipline(discipline: Discipline) {
    this.donkey.setData(discipline);
    this.router.navigate(['home/list-discipline/edit-discipline']);
  }
  deleteDiscipline(discipline: Discipline) {
    this.apiDisciplines
      .removeDisciplineUsingDELETE(discipline.id)
      .subscribe((data) => {
        if (data) {
          this.apiDisciplines.getDisciplinesUsingGET().subscribe((data) => {
            this.disciplines = data as Discipline[];
            this.loadPaginator(this.disciplines, 'name');
            // TODO
            // FILTER DISCIPLINES ACCORDING USER ID
            // show only the disciplines in which this user is involved
          });
        }
      });
  }
}
