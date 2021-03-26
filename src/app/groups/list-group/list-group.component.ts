import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { StudentsGroup } from 'src/app/model/students-group.model';
import { CollectionsUtil } from 'src/app/utils/collections-util';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent extends BaseComponent implements OnInit {
  groups: StudentsGroup[];
  collectionsUtil: CollectionsUtil;
  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'open', 'disciplines', 'count', /*'lector', 'assistant',*/ 'edit'];
  disableEdit: boolean = false;

  constructor(app: AppComponent, ar: ActivatedRoute, private donkey: DonkeyService) {
    super(ar);
    this.collectionsUtil = new CollectionsUtil();
  }

  ngOnInit(): void {
    this.groups = this.collectionsUtil.getGroups(); //admin

    if (this.user.roleId == 2) { //teacher
      //API CALL - getGroupsByTeacherId
      this.groups = this.groups.filter(gr => ((gr.disciplines.findIndex(d => d.lectorId === this.user.userId) !== -1)
        || (gr.disciplines.findIndex(d => d.assitantId === this.user.userId) !== -1)));
    } else if (this.user.roleId == 3) {// students 
      this.disableEdit = true;
      this.groups = this.groups.filter(gr => (gr.students.findIndex(st => st.userId === this.user.userId) !== -1));
    }
    // this.attachLectors();
    this.loadPaginator(this.groups, 'name');
  }

  editGroup(group: StudentsGroup) {
    this.donkey.setData(group);
    this.router.navigate(['home/list-group/edit-group']);
  }

  changeGroupState(event: any) {
    console.log(event.value);
  }
  addGroup() {
    this.router.navigate(['home/list-group/add-group']);
  }

}
