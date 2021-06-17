import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMaterialsComponent } from './exam-materials.component';

describe('ExamMaterialsComponent', () => {
  let component: ExamMaterialsComponent;
  let fixture: ComponentFixture<ExamMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
