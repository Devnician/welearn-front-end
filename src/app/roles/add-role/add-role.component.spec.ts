import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RoleControllerService, UserControllerService } from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { Valido } from 'src/app/core/valido';
import { MaterialModule } from 'src/app/material.module';
import { AddRoleComponent } from './add-role.component';


describe('AddRoleComponent', () => {
  let component: AddRoleComponent;
  let fixture: ComponentFixture<AddRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [AddRoleComponent, BlitcenComponent],
      imports: [
        RouterTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule, MaterialModule, NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [
        UserControllerService,
        RoleControllerService, FormBuilder, Valido],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
