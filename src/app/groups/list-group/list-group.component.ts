import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupDto } from 'libs/rest-client/src';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent extends BaseComponent implements OnInit {
  groups: GroupDto[];
  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'disciplines', 'count', 'edit'];
  disableEdit: boolean = false;

  constructor(ar: ActivatedRoute, private donkey: DonkeyService, injector: Injector) {
    super(ar, injector);
  }

  ngOnInit(): void {

    AppComponent.myapp?.isUserAuthToFetch(this.apiGroups);
    this.apiGroups.findAllUsingGET1()
      .subscribe(data => {
        this.groups = data as GroupDto[];

        //TODO - fliter according role
        // if (this.user.roleId == 2) { //teacher
        //   //API CALL - getGroupsByTeacherId
        //   this.groups = this.groups.filter(gr => ((gr.disciplines.findIndex(d => d.lectorId === this.user.userId) !== -1)
        //     || (gr.disciplines.findIndex(d => d.assitantId === this.user.userId) !== -1)));
        // } else if (this.user.roleId == 3) {// students 
        //   this.disableEdit = true;
        //   this.groups = this.groups.filter(gr => (gr.students.findIndex(st => st.userId === this.user.userId) !== -1));
        // }

        this.loadPaginator(this.groups, 'name');
        // this.showSnack(data.message, '', 1300);
      });
  }

  editGroup(group: GroupDto) {
    this.donkey.setData(group);
    this.router.navigate(['home/list-group/edit-group']);
  }

  addGroup() {
    this.router.navigate(['home/list-group/add-group']);
  }
}
