import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogInfoComponent } from './dialog-info.component';


describe('DialogInfoComponent', () => {
  let component: DialogInfoComponent;
  let fixture: ComponentFixture<DialogInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogInfoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatDialogRef]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
