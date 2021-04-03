import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';
import { DonkeyService } from 'src/app/core/donkey.service';
import { ListDisciplineComponent } from './list-discipline.component';


describe('ListDisciplineComponent', () => {
  let component: ListDisciplineComponent;
  let fixture: ComponentFixture<ListDisciplineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListDisciplineComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AppComponent, ApiService, DonkeyService]
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
