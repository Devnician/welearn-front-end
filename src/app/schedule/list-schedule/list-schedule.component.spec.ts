import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListScheduleComponent } from './list-schedule.component';

describe('ListScheduleComponent', () => {
  let component: ListScheduleComponent;
  let fixture: ComponentFixture<ListScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
