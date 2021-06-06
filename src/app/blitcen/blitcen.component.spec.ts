import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  DisciplineControllerService,
  GroupControllerService,
  UserControllerService,
} from 'libs/rest-client/src';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { Valido } from '../core/valido';
import { BlitcenComponent } from './blitcen.component';

describe('BlitcenComponent', () => {
  let component: BlitcenComponent;
  let fixture: ComponentFixture<BlitcenComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AppModule, MatSnackBarModule],
        declarations: [BlitcenComponent, AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          UserControllerService,
          GroupControllerService,
          UserControllerService,
          DisciplineControllerService,
          Valido,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BlitcenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
