import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEventsComponent } from './dialog-events.component';

describe('DialogEventsComponent', () => {
  let component: DialogEventsComponent;
  let fixture: ComponentFixture<DialogEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
