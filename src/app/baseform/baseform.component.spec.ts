import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseformComponent } from './baseform.component';

describe('BaseformComponent', () => {
  let component: BaseformComponent;
  let fixture: ComponentFixture<BaseformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
