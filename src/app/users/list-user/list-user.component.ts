import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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

export class ListUserComponent extends BaseComponent implements AfterViewInit, OnInit {
  interval: any;
  displayedColumns = ['online', 'role', 'firstName', 'middleName', 'lastName', 'edit'];
  roles: Role[] = [];
  users: User[] = [];
  groups: Group[];
  disableEdit: boolean = false;

  ngAfterViewInit(): void {
  }

  constructor(public snackBar: MatSnackBar, app: AppComponent, ar: ActivatedRoute, private donkey: DonkeyService) {
    super(ar);
    this.roles = app.roles;
    // console.log(this.roles);
  }

  ngOnInit() {
    // this.groups = AppComponent.collections.getGroups();
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
    // this.users = this.mapRoleAndPositionOfUsers(this.app.users);
    let userRoleId = this.user.role.id;

    if (userRoleId === 3) {//admin

      // this.users = this.app.users;
      // console.log(this.users);
    } else if (userRoleId === 4) {//teacher    
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

    } else if (userRoleId === 5) { // student
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
  // mapRoleAndPositionOfUsers(users: User[]): User[] {
  //   for (let index = 0; index < users.length; index++) {
  //     const element = users[index];

  //     let role = this.roles.find(r => r.id == element.roleId);
  //     // let position = this.positions.find(p => p.id === element.positionId); 
  //     element.role = this.langExt == '_bg' ? role.roleBg : role.role;
  //     element.role = role.role;
  //     element.rol
  //   }
  //   return users;
  // }

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
    user.password = 'unknown';
    console.log(user);
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