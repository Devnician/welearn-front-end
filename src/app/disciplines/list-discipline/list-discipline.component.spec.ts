import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDisciplineComponent } from './list-discipline.component';

describe('ListDisciplineComponent', () => {
  let component: ListDisciplineComponent;
  let fixture: ComponentFixture<ListDisciplineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDisciplineComponent ]
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
