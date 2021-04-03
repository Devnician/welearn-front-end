import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonkeyService } from 'src/app/core/donkey.service';
import { EditRoleComponent } from './edit-role.component';


describe('EditRoleComponent', () => {
  let component: EditRoleComponent;
  let fixture: ComponentFixture<EditRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoleComponent],

      providers: [DonkeyService, MatSnackBar]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
