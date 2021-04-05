import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DonkeyService } from 'src/app/core/donkey.service';
import { Valido } from 'src/app/core/valido';
import { MaterialModule } from 'src/app/material.module';
import { EditUserComponent } from './edit-user.component';


describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [EditUserComponent],
      imports: [
        // CommonModule,
        // FormsModule,
        // ReactiveFormsModule, 

        HttpClientTestingModule, RouterTestingModule, MaterialModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DonkeyService, FormBuilder, Valido
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
