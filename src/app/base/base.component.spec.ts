import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DisciplineControllerService, GroupControllerService, RoleControllerService, UserControllerService } from 'libs/rest-client/src';
import { Valido } from '../core/valido';
import { AddDisciplineComponent } from '../disciplines/add-discipline/add-discipline.component';
import { MaterialModule } from '../material.module';
import { BaseComponent } from './base.component';


describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [BaseComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        MaterialModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        UserControllerService,
        RoleControllerService,
        GroupControllerService,
        AddDisciplineComponent,
        DisciplineControllerService,
        Valido, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
