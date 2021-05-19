import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Calendar module
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationControllerService, DisciplineControllerService, EvaluationMarkControllerService, GroupControllerService, RoleControllerService, UserControllerService } from 'libs/rest-client/src';
import { MatTimepickerModule } from 'mat-timepicker';
//datetime picker
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { BaseformComponent } from './baseform/baseform.component';
import { BlitcenComponent } from './blitcen/blitcen.component';
import { DonkeyService } from './core/donkey.service';
import { GlobalErrorHandler } from './core/global-error-handler';
import { TokenInterceptor } from "./core/interceptor";
import { Valido } from './core/valido';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';
//import { DATE_TIME_LOCALE } from 'angular-calendar';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { AddDisciplineComponent } from './disciplines/add-discipline/add-discipline.component';
import { EditDisciplineComponent } from './disciplines/edit-discipline/edit-discipline.component';
import { ListDisciplineComponent } from './disciplines/list-discipline/list-discipline.component';
import { DocumentsComponent } from './documents/documents.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { CalendarComponent } from './events/calendar/calendar.component';
import { ListEventComponent } from './events/list-event/list-event.component';
import { FilterPipe } from './filter.pipe';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { LoginComponent } from './login/login.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { MaterialModule } from './material.module';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { ListRoleComponent } from './roles/list-role/list-role.component';
import { RoomComponent } from './rooms/room/room.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { AlertTagComponent } from './utils/alert-tag.component';
import { LoaderComponent } from './utils/loader.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    MainscreenComponent,
    AddRoleComponent,
    EditRoleComponent,
    ListRoleComponent,
    FilterPipe,
    HelpPageComponent,
    CalendarComponent,
    BaseComponent,
    BaseformComponent,
    DialogModalComponent,
    BlitcenComponent,
    DialogInfoComponent,
    DocumentsComponent,
    AlertTagComponent,
    LoaderComponent,
    ListEventComponent,
    AddEventComponent,
    ListGroupComponent,
    EditGroupComponent,
    ListDisciplineComponent,
    RoomComponent,
    AddGroupComponent,
    AddDisciplineComponent,
    EditDisciplineComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FullCalendarModule, // register FullCalendar with you app
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ngx-translate and the loader module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    LayoutModule,

    MatDatepickerModule,
    MatTimepickerModule,
    MatIconModule,


    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DragDropModule,
    ScrollingModule,
  ],
  entryComponents: [
    DialogModalComponent,
    DialogInfoComponent,
  ],

  providers: [
    AuthenticationControllerService,
    RoleControllerService,
    UserControllerService,
    DisciplineControllerService,
    EvaluationMarkControllerService,
    GroupControllerService,
    DonkeyService,
    FilterPipe,
    Valido, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },

    { provide: MAT_DATE_LOCALE, useValue: 'bg' },
    //for dateTime picker
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'bg' },
    // { provide: CALENDAR_DATE_TIME_LOCALE: 'bg'},
    // { provide: OwlDateTimeIntl, useClass: DefaultIntl },
    //,
    // { provide: DateAdapter, useClass: MyDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    // { provide: NGX_MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    //NgxMatNativeDateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
  // constructor(injector: Injector) {
  //   AppInjector.setInjector(injector);
  // }
}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//https://fullcalendar.io/docs/angular
//  ng build --prod --base-href /we-learn/
/// --outputHashing=all
//// USe this for refresh client after deploy
//  ng build --prod --outputHashing=all --base-href /we-learn/
