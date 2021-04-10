import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserControllerService } from 'libs/rest-client/src';
import { Valido } from '../core/valido';
import { MaterialModule } from '../material.module';
import { MainscreenComponent } from './mainscreen.component';


describe('MainscreenComponent', () => {
  let component: MainscreenComponent;
  let fixture: ComponentFixture<MainscreenComponent>;

  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [MainscreenComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserControllerService, Valido, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
