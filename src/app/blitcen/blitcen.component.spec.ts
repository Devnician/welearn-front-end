import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlitcenComponent } from './blitcen.component';

describe('BlitcenComponent', () => {
  let component: BlitcenComponent;
  let fixture: ComponentFixture<BlitcenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlitcenComponent ]
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
