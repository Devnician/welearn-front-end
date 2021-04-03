import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { ListDisciplineComponent } from './list-discipline.component';


describe('ListDisciplineComponent', () => {
  let component: ListDisciplineComponent;
  let fixture: ComponentFixture<ListDisciplineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListDisciplineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AppComponent]
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
