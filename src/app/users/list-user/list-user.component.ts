import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DonkeyService } from 'src/app/core/donkey.service';
import { StudentsGroup } from 'src/app/model/students-group.model';
import { AppComponent } from '../../app.component';
import { BaseComponent } from '../../base/base.component';
import { Role } from '../../model/role.model';
import { User } from "../../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent extends BaseComponent implements AfterViewInit, OnInit {
  interval: any;
  displayedColumns = ['online', 'role', 'firstName', 'middleName', 'lastName', 'edit'];
  roles: Role[] = [];
  users: User[] = [];
  groups: StudentsGroup[];
  disableEdit: boolean = false;

  ngAfterViewInit(): void {
  }

  constructor(public snackBar: MatSnackBar, app: AppComponent, ar: ActivatedRoute, private donkey: DonkeyService) {
    super(ar);
    this.roles = app.roles;
  }

  ngOnInit() {
    this.groups = AppComponent.collections.getGroups();
    // this.api.getRoles().subscribe(data => {
    //   this.roles = data.result;
    // }); 
    /**
     * Refresh data every 30 sec
     */
    this.loadUsers();
    this.interval = setInterval(() => {
      this.loadUsers();
    }, 30000);
  }


  /**
   * Fetch users
   */
  loadUsers() {
    if (this.user.roleId === 1) {//admin
      this.users = this.mapRoleAndPositionOfUsers(this.app.users);
    } else if (this.user.roleId === 2) {//teacher    
      //API CALL - getGroupsByTeacherId
      this.groups = this.groups.filter(gr => ((gr.disciplines.findIndex(d => d.lectorId === this.user.id) !== -1)
        || (gr.disciplines.findIndex(d => d.assitantId === this.user.id) !== -1)));

      let array = [];
      this.groups.forEach(group => {
        group.students.forEach(st => {
          array.push(st.id);
        })
      });

      this.users = this.mapRoleAndPositionOfUsers(this.app.users.filter(x => array.indexOf(x.id) !== -1));

    } else if (this.user.roleId === 3) { // student
      this.disableEdit = true;
      this.groups = this.groups.filter(gr => (gr.students.findIndex(st => st.id === this.user.id) !== -1));
      let array = [];
      this.groups.forEach(group => {
        group.students.forEach(st => {
          if (st.id !== this.user.id) {
            array.push(st.id);
          }
        })
      });
      this.users = this.mapRoleAndPositionOfUsers(this.app.users.filter(user => array.indexOf(user.id) !== -1));

    } else {
      this.disableEdit = true;
      return;
    }

    this.loadPaginator(this.users, '');
    // this.api.getUsers()
    //   .subscribe(data => {
    //     let users: User[] = data.result;
    //     if (this.user.roleId !== 1) {
    //       console.log('here is someone else');
    //       users = users.filter(u => u.id !== this.user.id);
    //     }
    //     else {
    //       console.log('here is the super');
    //     }
    //     users = this.mapRoleAndPositionOfUsers(users);
    //     this.loadPaginator(users, '');
    //   });
  }
  mapRoleAndPositionOfUsers(users: User[]): User[] {
    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      let role = this.roles.find(r => r.id == element.roleId);
      // let position = this.positions.find(p => p.id === element.positionId); 
      element.role = this.langExt == '_bg' ? role.roleBg : role.role;
    }
    return users;
  }

  goBack() {
    history.back();
  }

  // /**
  //  * 
  //  * @param user Logical deletion of user
  //  */
  // deleteUser(user: User): void {
  //   if (user.id === 1) { // Can't delete root user
  //     alert('can\'t delete this user');
  //     this.router.navigate(['list-user']);
  //   } else {
  //     this.apiService.deleteUser(user.id)
  //       .subscribe(data => {
  //         this.hideDeletedItem(user);
  //         this.snackBar.open(data.message, "", {
  //           duration: 3500,
  //         });
  //       })
  //   }
  // };

  editUser(user: User): void {
    user.password = '*';
    this.donkey.setData(user);
    this.router.navigate(['home/list-user/edit-user']);
  };
  /**
   *  Opens  page 'add user'
   */
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