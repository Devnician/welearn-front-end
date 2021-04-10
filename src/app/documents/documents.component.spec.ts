import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserControllerService } from 'libs/rest-client/src';
import { Valido } from '../core/valido';
import { MaterialModule } from '../material.module';
import { DocumentsComponent } from './documents.component';


describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserControllerService,
        Valido, FormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
