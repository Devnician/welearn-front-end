import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent extends BaseComponent implements OnInit {

  @ViewChild('table', { static: true }) table: MatTable<any>;

  displayedColumns = ['id', 'role', 'description', 'edit'];
  roles: Role[] = [];
  isDone: boolean = false;

  constructor(private donkey: DonkeyService, ar: ActivatedRoute) {
    super(ar);
  }
  ngOnInit() {
    this.loadRoles();
  }
  /**
   * Fetch and show role's to the user.
   */
  loadRoles() {
    this.roles = this.app.roles;
    this.isDone = true;
    this.paginator.init(this.roles.filter((role: { id: number; }) => role.id !== 1), '');
    // this.api.getRoles()
    //   .subscribe(data => {
    //     let result: Role[] = data.result;
    //     this.isDone = true;
    //     if (this.user.roleId !== 1) {
    //       console.log('here is someone else');
    //       this.paginator.init(result.filter((role: { id: number; }) => role.id !== 1), '');
    //     } else {
    //       console.log('here is the super');
    //       this.paginator.init(result, '');
    //     }
    //   });
  }

  addRole(): void {
    this.router.navigate(['home/list-role/add-role']);
  };

  deleteRole(role: Role): void {
    alert('not implemented yet..');
    this.router.navigate(['home/list-role']);
    // if (role.id == 1) {  
    //   alert('can\'t delete this role. THIS IS THE \'SUPER USER\'');
    //   this.router.navigate(['list-role']);
    // } else {
    //   this.apiService.deleteRole(role.id)
    //     .subscribe(data => {
    //       this.paginator.origin.filter(r => r !== role);         
    //     })
    // }
  };

  editRole(role: Role): void {
    this.donkey.setData(role);
    this.router.navigate(['home/list-role/edit-role']);
  };

}
