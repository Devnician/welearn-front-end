import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisciplineComponent } from './add-discipline.component';

describe('AddDisciplineComponent', () => {
  let component: AddDisciplineComponent;
  let fixture: ComponentFixture<AddDisciplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDisciplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
