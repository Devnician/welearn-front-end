import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/api.service';
import { Valido } from 'src/app/core/valido';
import { MaterialModule } from 'src/app/material.module';
import { AddDisciplineComponent } from './add-discipline.component';


describe('AddDisciplineComponent', () => {
  let component: AddDisciplineComponent;
  let fixture: ComponentFixture<AddDisciplineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule, MaterialModule, NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AddDisciplineComponent],
      providers: [ApiService, FormBuilder, Valido]


    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
