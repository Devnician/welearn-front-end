import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DonkeyService } from 'src/app/core/donkey.service';
import { ListRoleComponent } from './list-role.component';


describe('ListRoleComponent', () => {
  let component: ListRoleComponent;
  let fixture: ComponentFixture<ListRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListRoleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [DonkeyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
