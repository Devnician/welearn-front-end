import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DisciplineControllerService, GroupControllerService, RoleControllerService, UserControllerService } from 'libs/rest-client/src';
import { Valido } from '../core/valido';
import { MaterialModule } from '../material.module';
import { BaseformComponent } from './baseform.component';


describe('BaseformComponent', () => {
  let component: BaseformComponent;
  let fixture: ComponentFixture<BaseformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BaseformComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        UserControllerService,
        RoleControllerService,
        GroupControllerService,
        DisciplineControllerService,
        Valido, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
