import { Component, ContentChild, Injector, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatNoDataRow } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GroupControllerService, GroupDto } from 'libs/rest-client/src';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { MenuOptions } from 'src/app/model/menu.model';
import { CollectionsUtil } from 'src/app/utils/collections-util';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
})
export class ListGroupComponent extends BaseComponent implements OnInit {
  @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;
  groups: GroupDto[];
  displayedColumns = [
    'id',
    'name',
    'startDate',
    'endDate',
    'disciplines',
    'count',
    'actions',
  ];
   
  
  cm: MenuOptions;
  constructor(
    ar: ActivatedRoute,
    private donkey: DonkeyService,
    injector: Injector,
    private s: MatSnackBar,
    public apiGroups: GroupControllerService,
    private collectionsUtil:CollectionsUtil
  ) {
    super(ar, injector, s);
    this.addAuthorizationToService(apiGroups);
    this.cm = AppComponent.myapp.getCurrentMenuObject(this.router.url);
    console.log(this.router.url)
     console.log(this.cm)
  }

  ngOnInit(): void {
    this.apiGroups?.findAllUsingGET2().subscribe((data) => {
      this.groups = data as GroupDto[];
      this.groups = this.collectionsUtil.filterGroupsAccordingUserRole(this.groups, this.user);
      this.loadPaginator(this.groups, 'name');
      this.show = false;
    });
  }

  editGroup(group: GroupDto) {
    this.donkey.setData(group);
    this.router.navigate(['home/list-group/edit-group']);
  }

  addGroup() {
    this.router.navigate(['home/list-group/add-group']);
  }
// Not now..
  // deleteGroup(id: string) {
  //   this.apiGroups.deleteGroupUsingDELETE(id).subscribe((data) => {
  //     if (data) {
  //       // tslint:disable-next-line: no-shadowed-variable
  //       this.apiGroups.findAllUsingGET2().subscribe((data) => {
  //         this.groups = data as GroupDto[];
  //         this.loadPaginator(this.groups, 'name');
  //       });
  //     }
  //   });
  // }
}
