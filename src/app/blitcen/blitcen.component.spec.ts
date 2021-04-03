import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApiService } from '../core/api.service';
import { AppInjector } from '../core/app-injector.servise';
import { BlitcenComponent } from './blitcen.component';


describe('BlitcenComponent', () => {
  let component: BlitcenComponent;
  let fixture: ComponentFixture<BlitcenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlitcenComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ApiService, AppInjector

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
