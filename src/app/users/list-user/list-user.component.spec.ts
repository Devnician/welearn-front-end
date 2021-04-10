import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GroupControllerService, RoleControllerService, UserControllerService } from 'libs/rest-client/src';
import { Valido } from 'src/app/core/valido';
import { MaterialModule } from 'src/app/material.module';
import { ListUserComponent } from './list-user.component';


describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({


      declarations: [ListUserComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MaterialModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserControllerService, GroupControllerService, RoleControllerService, FormBuilder, Valido]


    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
