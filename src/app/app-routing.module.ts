import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDisciplineComponent } from './disciplines/add-discipline/add-discipline.component';
import { EditDisciplineComponent } from './disciplines/edit-discipline/edit-discipline.component';
import { ListDisciplineComponent } from './disciplines/list-discipline/list-discipline.component';
import { DocumentsComponent } from './documents/documents.component';
import { CalendarComponent } from './events/calendar/calendar.component';
import { RoomComponent } from './events/room/room.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
/**
 *
 */
import { HelpPageComponent } from './help-page/help-page.component';
import { LoginComponent } from './login/login.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
/**
 * Roles
 */
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { ListRoleComponent } from './roles/list-role/list-role.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginComponent },

      {
        path: 'login',
        component: LoginComponent,
        //  data: { breadcrumb: 'login' },
      },

      {
        path: 'home',
        data: { breadcrumb: 'wl.home' },

        children: [
          {
            path: '',
            component: MainscreenComponent,
          },

          // USERS
          {
            path: 'list-user',
            data: { breadcrumb: 'wl.menu_list_users' },
            children: [
              {
                path: '',
                component: ListUserComponent,
              },
              {
                path: 'edit-user',
                component: EditUserComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
            ],
          },

          // ROLES
          {
            path: 'list-role',
            data: { breadcrumb: 'wl.roles' },
            children: [
              {
                path: '',
                component: ListRoleComponent,
              },
              {
                path: 'add-role',
                component: AddRoleComponent,
                data: { breadcrumb: 'wl.add' },
              },
              {
                path: 'edit-role',
                component: EditRoleComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
            ],
          },
          {
            path: 'list-event',
            data: { breadcrumb: 'wl.events' },
            children: [
              {
                path: '',
                component: CalendarComponent,
              },
              {
                path: 'room',
                component: RoomComponent,
                data: { breadcrumb: 'wl.room' },
              },
            ],
          },
          {
            path: 'list-group',
            data: { breadcrumb: 'wl.groups' },
            children: [
              {
                path: '',
                component: ListGroupComponent,
              },
              {
                path: 'edit-group',
                component: EditGroupComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
              {
                path: 'add-group',
                component: AddGroupComponent,
                data: { breadcrumb: 'wl.add_breadcrumb' },
              },
            ],
          },
          {
            path: 'list-schedule',
            data: { breadcrumb: 'wl.schedule' },
            children: [
              {
                path: '',
                component: CalendarComponent, // ListScheduleComponent,
              },
            ],
          },
          {
            path: 'list-discipline',
            data: { breadcrumb: 'wl.disciplines' },
            children: [
              {
                path: '',
                component: ListDisciplineComponent,
              },
              {
                path: 'edit-discipline',
                component: EditDisciplineComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
              {
                path: 'add-discipline',
                component: AddDisciplineComponent,
                data: { breadcrumb: 'wl.add_breadcrumb' },
              },
            ],
          },
          // Singe pages
          {
            path: 'help-page',
            component: HelpPageComponent,
            data: { breadcrumb: 'wl.help' },
          },
          {
            path: 'documents',
            component: DocumentsComponent,
            data: { breadcrumb: 'wl.menu_documents' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
