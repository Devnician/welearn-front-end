import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { StudentsGroup } from 'src/app/model/students-group.model';
import { User } from 'src/app/model/user.model';
import { CollectionsUtil } from 'src/app/utils/collections-util';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent extends BaseComponent implements OnInit {
  groups: StudentsGroup[];
  collectionsUtil: CollectionsUtil;
  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'open', 'disciplines', 'count', 'lector', 'assistant', 'edit'];
  disableEdit: boolean = false;
  constructor(app: AppComponent, ar: ActivatedRoute, private donkey: DonkeyService) {
    super(ar);
    this.collectionsUtil = new CollectionsUtil();
  }

  ngOnInit(): void {
    this.groups = this.collectionsUtil.getGroups();

    if (this.user.roleId == 2) { // teacher
      //this will fetched by ID in development
      this.groups = this.groups.filter(gr => (gr.lectorId === this.user.id || gr.assitantId === this.user.id));

    } else if (this.user.roleId == 3) {// students 
      this.disableEdit = true;
      this.groups = this.groups.filter(gr => (gr.students.findIndex(st => st.id === this.user.id) !== -1));
    }
    this.attachLectors();
    this.loadPaginator(this.groups, 'name');
  }
  attachLectors() {
    let users: User[] = this.app.users;
    this.groups.forEach(gr => {
      let lector = users.filter(u => u.id == gr.lectorId)[0];
      let assistant = users.filter(u => u.id == gr.assitantId)[0];
      gr.lector = lector;
      gr.assistant = assistant;
    });

    console.log(this.groups);
  }

  editGroup(group: StudentsGroup) {
    this.donkey.setData(group);
    this.router.navigate(['home/list-group/edit-group']);
  }

  changeGroupState(event: any) {
    console.log(event.value);
  }
  addGroup() {
    alert('not implemented yet');
  }

}
