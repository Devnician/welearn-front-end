import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlitcenComponent } from './blitcen.component';

describe('BlitcenComponent', () => {
  let component: BlitcenComponent;
  let fixture: ComponentFixture<BlitcenComponent>;

  beforeEach(async(() => {
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
