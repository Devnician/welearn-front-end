import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/api.service';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Valido } from 'src/app/core/valido';
import { MaterialModule } from 'src/app/material.module';
import { PPaginator } from 'src/app/utils/paginator.model';
import { ListDisciplineComponent } from './list-discipline.component';


describe('ListDisciplineComponent', () => {
  let component: ListDisciplineComponent;
  let fixture: ComponentFixture<ListDisciplineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })],
      declarations: [ListDisciplineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ApiService, DonkeyService, PPaginator, Valido, FormBuilder


      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
