import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DonkeyService } from 'src/app/core/donkey.service';
import { EditDisciplineComponent } from './edit-discipline.component';


describe('EditDisciplineComponent', () => {
  let component: EditDisciplineComponent;
  let fixture: ComponentFixture<EditDisciplineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditDisciplineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ActivatedRoute, DonkeyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
