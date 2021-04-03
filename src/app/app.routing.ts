import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { AddDisciplineComponent } from './disciplines/add-discipline/add-discipline.component';
import { EditDisciplineComponent } from './disciplines/edit-discipline/edit-discipline.component';
import { ListDisciplineComponent } from './disciplines/list-discipline/list-discipline.component';
import { DocumentsComponent } from './documents/documents.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { ListEventComponent } from './events/list-event/list-event.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
/**
 *
 */
import { HelpPageComponent } from "./help-page/help-page.component";
import { LoginComponent } from "./login/login.component";
import { MainscreenComponent } from "./mainscreen/mainscreen.component";
/**
 * Roles
 */
import { AddRoleComponent } from "./roles/add-role/add-role.component";
import { EditRoleComponent } from "./roles/edit-role/edit-role.component";
import { ListRoleComponent } from "./roles/list-role/list-role.component";
import { RoomComponent } from './rooms/room/room.component';
import { ListScheduleComponent } from './schedule/list-schedule/list-schedule.component';
/**
 * User
 */
import { AddUserComponent } from "./users/add-user/add-user.component";
import { EditUserComponent } from "./users/edit-user/edit-user.component";
import { ListUserComponent } from "./users/list-user/list-user.component";




const routes: Routes = [
  {
    path: '',
    children: [

      { path: '', component: LoginComponent },

      {
        path: 'login', component: LoginComponent,
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

          //USERS
          {
            path: 'list-user',
            data: { breadcrumb: 'wl.menu_list_users' },
            children: [
              {
                path: '', component: ListUserComponent,
              },
              {
                path: 'add-user', component: AddUserComponent,
                data: { breadcrumb: 'wl.add' },
              },
              {
                path: 'edit-user', component: EditUserComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
            ]
          },

          //ROLES
          {
            path: 'list-role',
            data: { breadcrumb: 'wl.roles' },
            children: [
              {
                path: '', component: ListRoleComponent,
              },
              {
                path: 'add-role', component: AddRoleComponent,
                data: { breadcrumb: 'wl.add' },
              },
              {
                path: 'edit-role', component: EditRoleComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
            ]
          },
          {
            path: 'list-event',
            data: { breadcrumb: 'wl.events' },
            children: [
              {
                path: '', component: ListEventComponent,
              },
              {
                path: 'add-event', component: AddEventComponent,
                data: { breadcrumb: 'wl.add' },
              },
              {
                path: 'edit-event', component: EditEventComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },

              {
                path: 'room', component: RoomComponent,
                data: { breadcrumb: 'wl.room' },
              },
            ]
          },
          {
            path: 'list-group',
            data: { breadcrumb: 'wl.groups' },
            children: [
              {
                path: '', component: ListGroupComponent,
              },
              {
                path: 'edit-group', component: EditGroupComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
              {
                path: 'add-group', component: AddGroupComponent,
                data: { breadcrumb: 'wl.add_breadcrumb' },
              },
            ]
          },
          {
            path: 'list-schedule',
            data: { breadcrumb: 'wl.schedule' },
            children: [
              {
                path: '', component: ListScheduleComponent,
              }
            ]
          },
          {
            path: 'list-discipline',
            data: { breadcrumb: 'wl.disciplines' },
            children: [
              {
                path: '', component: ListDisciplineComponent,
              },
              {
                path: 'edit-discipline', component: EditDisciplineComponent,
                data: { breadcrumb: 'wl.edit_breadcrumb' },
              },
              {
                path: 'add-discipline', component: AddDisciplineComponent,
                data: { breadcrumb: 'wl.add_breadcrumb' },
              },
            ]
          },
          //Singe pages
          {
            path: 'help-page', component: HelpPageComponent,
            data: { breadcrumb: 'wl.help' },
          },
          {
            path: 'calendar', component: CalendarComponent,
            data: { breadcrumb: 'wl.calendar' },
          },

          {
            path: 'documents', component: DocumentsComponent,
            data: { breadcrumb: 'wl.menu_documents' },
          },
        ]
      },

    ]
  }
];

export const routing = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });