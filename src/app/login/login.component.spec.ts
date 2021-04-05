import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../core/api.service';
import { Valido } from '../core/valido';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // @Component({ selector: 'app-login', template: '' })
  // class LoginComponent { }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [LoginComponent],
      imports:
        [RouterTestingModule, HttpClientTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: TranslateFakeLoader
            }
          })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ApiService, Injector, FormBuilder, Valido,
        {
          provide: FormGroup,
          useValue: undefined
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
