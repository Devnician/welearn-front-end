import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { GroupDto } from 'libs/rest-client/src';
import { DonkeyService } from 'src/app/core/donkey.service';
import { UserDto } from '../../../../libs/rest-client/src/model/userDto';
import { BaseComponent } from '../../base/base.component';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  interval: any;
  displayedColumns = [
    'online',
    'role',
    'firstName',
    'middleName',
    'lastName',
    'edit',
  ];
  roles: Role[] = [];
  users: UserDto[] = [];
  groups: GroupDto[];
  disableEdit = false;

  constructor(
    ar: ActivatedRoute,
    private donkey: DonkeyService,
    injector: Injector,
    private s: MatSnackBar
  ) {
    super(ar, injector, s);
    if (this.user) {
      this.fetchRoles();
    }
  }

  fetchRoles() {
    this.apiRoles.listRolesUsingGET().subscribe((data) => {
      this.roles = data as Role[];
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.interval = setInterval(() => {
      this.loadUsers();
    }, 30000); // Refresh
  }

  /**
   * Fetch all users
   */
  loadUsers() {
    this.apiUsers?.listUserUsingGET().subscribe((data) => {
      this.users = data;
      this.filterUsers();
    });
  }

  filterUsers() {
    const currentUserRoleAsString = this.user.role.role;
    if (currentUserRoleAsString.includes('admin')) {
      // go go
    } else if (currentUserRoleAsString.includes('teacher')) {
      // API CALL - getGroupsByTeacherId
      this.groups = this.groups.filter(
        (gr) =>
          gr.disciplines.findIndex(
            (d) => d.teacher?.userId === this.user.userId
          ) !== -1 ||
          gr.disciplines.findIndex(
            (d) => d.assistant.userId === this.user.userId
          ) !== -1
      );

      const array = [];
      this.groups.forEach((group) => {
        group.users.forEach((st) => {
          array.push(st.userId);
        });
      });
      this.users = this.users.filter((x) => array.indexOf(x.userId) !== -1);
    } else if (currentUserRoleAsString.includes('student')) {
      this.disableEdit = true;
      this.groups = this.groups.filter(
        (gr) =>
          gr.users.findIndex((st) => st.userId === this.user.userId) !== -1
      );
      const array = [];
      this.groups.forEach((group) => {
        group.users.forEach((st) => {
          if (st.userId !== this.user.userId) {
            array.push(st.userId);
          }
        });
      });
      this.users = this.users.filter(
        (user) => array.indexOf(user.userId) !== -1
      );
    } else {
      this.disableEdit = true;
      return;
    }

    this.loadPaginator(this.users, '');
  }

  goBack() {
    history.back();
  }

  editUser(user: UserDto): void {
    if (user) {
      user.password = 'unknown';
      this.donkey.setData(user);
    }

    this.router.navigate(['home/list-user/edit-user']);
  }

  /**
   * Destructor
   */
  ngOnDestroy() {
    clearInterval(this.interval);
    delete this.paginator;
  }
}
