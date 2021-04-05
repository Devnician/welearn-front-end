import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { ApiService } from '../core/api.service';
import { Valido } from '../core/valido';
import { BlitcenComponent } from './blitcen.component';


describe('BlitcenComponent', () => {
  let component: BlitcenComponent;
  let fixture: ComponentFixture<BlitcenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [BlitcenComponent, AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ApiService, Valido

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlitcenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
