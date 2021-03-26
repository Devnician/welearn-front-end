import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Discipline } from 'src/app/model/discipline.model';
import { StudentsGroup } from 'src/app/model/students-group.model';
import { CollectionsUtil } from 'src/app/utils/collections-util';

@Component({
  selector: 'app-list-discipline',
  templateUrl: './list-discipline.component.html',
  styleUrls: ['./list-discipline.component.scss']
})
export class ListDisciplineComponent extends BaseComponent implements OnInit {
  displayedColumns = ['id', 'name', 'createdAt', 'updatedAt', 'lector', 'assistant', 'edit'];
  disciplines: Discipline[] = [];
  collectionsUtil: CollectionsUtil;
  groups: StudentsGroup[];
  disableEdit: boolean = false;

  constructor(app: AppComponent, ar: ActivatedRoute, private donkey: DonkeyService) {
    super(ar);

    this.collectionsUtil = new CollectionsUtil();
  }

  ngOnInit(): void {
    //this.app.users.filter(x => array.indexOf(x.id) !== -1)
    this.api.getDisciplines().subscribe(
      data => {
        console.log(data);
        this.disciplines = data.result;


      }
    );
    // this.disciplines = this.app.disciplines;
    // console.log()
    if (this.user.roleId === 2) {
      this.disciplines = this.app.disciplines.filter(d => (d.lector?.userId === this.user.userId || d.assistant?.userId === this.user.userId));
    } else if (this.user.roleId === 3) {
      this.disableEdit = true;
      this.groups = this.collectionsUtil.getGroups();
      this.groups = this.groups.filter(gr => (gr.students.findIndex(st => st.userId === this.user.userId) !== -1));

      let array = [];
      this.groups.forEach(group => {
        group.disciplines.forEach(disc => {
          array.push(disc.id);
        })
      });
      this.disciplines = this.disciplines.filter(user => array.indexOf(user.id) !== -1);
    }

    this.loadPaginator(this.disciplines, 'name');
  }

  addDiscipline() {
    this.router.navigate(['home/list-discipline/add-discipline']);
  }

  editDiscipline(discipline: Discipline) {
    this.donkey.setData(discipline);
    this.router.navigate(['home/list-discipline/edit-discipline']);
  }
}
