import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injector, Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { MatToolbarModule, MatSliderModule, MatSlideToggleModule, MAT_DATE_FORMATS, NativeDateAdapter, MatDialogModule, MAT_DATE_LOCALE } from '@angular/material';
import { ApiService } from "./core/api.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { routing } from "./app.routing";
import { TokenInterceptor } from "./core/interceptor";
import { LayoutModule } from '@angular/cdk/layout';

import { MatMenuModule } from '@angular/material';

import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';

import { MatPaginatorModule } from '@angular/material';


import { MatCardModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';

import { MatDatepickerModule } from '@angular/material/datepicker';
//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';


import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AlertTagComponent } from './utils/alert-tag.component';
import { LoaderComponent } from './utils/loader.component';



/**
 * MAt modules
 */

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, MatMenuPanel } from '@angular/material';

import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';


// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { EditRoleComponent } from './roles/edit-role/edit-role.component';
import { ListRoleComponent } from './roles/list-role/list-role.component';
import { GlobalErrorHandler } from './core/global-error-handler';
import { FilterPipe } from './filter.pipe';
import { HelpPageComponent } from './help-page/help-page.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';



import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
//import { adapterFactory } from 'angular-calendar/date-adapters/moment/index/CALENDAR_DATE_TIME_LOCALE';
import { CalendarComponent } from './calendar/calendar/calendar.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';



import { BaseComponent } from './base/base.component';
import { DonkeyService } from './core/donkey.service';
import { BaseformComponent } from './baseform/baseform.component';



import { MatFormFieldModule, MatRippleModule } from '@angular/material';


import { AppInjector } from './core/app-injector.servise';
//datetime picker
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
//import { DATE_TIME_LOCALE } from 'angular-calendar';


import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

import { Valido } from './core/valido';

import { BlitcenComponent } from './blitcen/blitcen.component';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';

import { DocumentsComponent } from './documents/documents.component';
import { ListEventComponent } from './events/list-event/list-event.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { ListGroupComponent } from './groups/list-group/list-group.component';
import { ListScheduleComponent } from './schedule/list-schedule/list-schedule.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { ListDisciplineComponent } from './disciplines/list-discipline/list-discipline.component';
import { RoomComponent } from './rooms/room/room.component';


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
    EditEventComponent,
    ListGroupComponent,
    ListScheduleComponent,
    EditGroupComponent,
    ListDisciplineComponent,
    RoomComponent,
    //  CalendarComponent,
    // NavComponent

    // 
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    //   CalendarComponent,

    // ngx-translate and the loader module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    MatToolbarModule,
    MatMenuModule,

    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    // NavComponent,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    LayoutModule,
    // MatToolbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDialogModule,

    //
    MatDatepickerModule,

    MatNativeDateModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    MatExpansionModule,

    DragDropModule,
    ScrollingModule,

    //
    MatSliderModule,
    MatSlideToggleModule,

    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgbModalModule,

    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),


  ],


  entryComponents: [

    DialogModalComponent,
    DialogInfoComponent,
  ],

  // exports: [NgxMatDatetimePickerModule, NgxMatNativeDateModule],

  providers: [ApiService, DonkeyService, FilterPipe, Valido, {
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
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

//  ng build --prod --base-href /we-learn/
/// --outputHashing=all
//// USe this for refresh client after deploy
//  ng build --prod --outputHashing=all --base-href /we-learn/