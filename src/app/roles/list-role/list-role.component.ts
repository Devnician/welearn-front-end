import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Role } from 'src/app/model/role.model';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent extends BaseComponent implements OnInit {
  @ViewChild('table', { static: true }) table: MatTable<any>;
  displayedColumns = ['id', 'role', 'description', 'edit'];
  roles: Role[] = [];

  constructor(
    private donkey: DonkeyService,
    ar: ActivatedRoute,
    injector: Injector,
    private s: MatSnackBar
  ) {
    super(ar, injector, s);
  }

  ngOnInit() {
    this.loadRoles();
  }
  /**
   * Fetch and show role's in table
   */
  loadRoles() {
    this.apiRoles?.listRolesUsingGET().subscribe((data) => {
      this.roles = data as Role[];
      this.paginator.init(this.roles, '');
      // this.paginator.init(this.roles.filter((role: { id: number; }) => role.id !== 1), '');
    });
  }

  addRole(): void {
    this.router.navigate(['home/list-role/add-role']);
  }

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
  }

  editRole(role: Role): void {
    this.donkey.setData(role);
    this.router.navigate(['home/list-role/edit-role']);
  }
}
