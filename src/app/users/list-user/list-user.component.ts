import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Group } from 'src/app/model/group.model';
import { AppComponent } from '../../app.component';
import { BaseComponent } from '../../base/base.component';
import { Role } from '../../model/role.model';
import { User } from "../../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent extends BaseComponent implements OnInit {
  interval: any;
  displayedColumns = ['online', 'role', 'firstName', 'middleName', 'lastName', 'edit'];
  user: User = AppComponent.myapp?.user;
  roles: Role[] = [];
  users: User[] = [];
  groups: Group[];
  disableEdit: boolean = false;

  constructor(ar: ActivatedRoute, private donkey: DonkeyService, injector: Injector) {
    super(ar, injector);
    if (this.user)
      this.fetchRoles();
  }

  fetchRoles() {
    this.api.getRoles().subscribe(
      data => {
        this.roles = data.result;
      }
    );
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
    this.api.findAllUsers().subscribe(
      data => {
        this.users = data.result;
        this.filterUsers();
      }
    );
  }


  filterUsers() {

    let currentUserRoleAsString = this.user.role.role;
    if (currentUserRoleAsString.includes('admin')) {
      // go go
    } else if (currentUserRoleAsString.includes('teacher')) {
      //API CALL - getGroupsByTeacherId
      this.groups = this.groups.filter(gr => ((gr.disciplines.findIndex(d => d.lectorId === this.user.userId) !== -1)
        || (gr.disciplines.findIndex(d => d.assitantId === this.user.userId) !== -1)));

      let array = [];
      this.groups.forEach(group => {
        group.users.forEach(st => {
          array.push(st.userId);
        })
      });
      this.users = this.users.filter(x => array.indexOf(x.userId) !== -1);

    } else if (currentUserRoleAsString.includes('student')) {
      this.disableEdit = true;
      this.groups = this.groups.filter(gr => (gr.users.findIndex(st => st.userId === this.user.userId) !== -1));
      let array = [];
      this.groups.forEach(group => {
        group.users.forEach(st => {
          if (st.userId !== this.user.userId) {
            array.push(st.userId);
          }
        })
      });
      this.users = this.users.filter(user => array.indexOf(user.userId) !== -1);
    } else {
      this.disableEdit = true;
      return;
    }

    this.loadPaginator(this.users, '');
  }

  goBack() {
    history.back();
  }

  editUser(user: User): void {
    user.password = 'unknown';
    this.donkey.setData(user);
    this.router.navigate(['home/list-user/edit-user']);
  };

  addUser(): void {
    this.router.navigate(['home/list-user/add-user']);
  };

  /**
   * Destructor
   */
  ngOnDestroy() {
    clearInterval(this.interval);
    delete this.paginator;
  }
}