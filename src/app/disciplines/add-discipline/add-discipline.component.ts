import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDto } from 'libs/rest-client/src';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.scss']
})
export class AddDisciplineComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;
  lectors: UserDto[];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    //TODO api call for lectors
    // this.lectors = AppComponent.myapp.users.filter(u => u.roleId === 2);

    this.apiUsers.listUserUsingGET1(2).subscribe(
      data => {
        this.lectors = data
        console.log(this.lectors);
      }
    )

    this.addForm = this.formBuilder.group({
      id: 0,
      name: [],
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      teacher: {},
      assistant: {}
    });
  }

  reset() {
    this.addForm.reset();
  }

  uploadDoc(doc: any) {

  }

  onSubmit() {
    if (!this.addForm.valid) {
      this.valido.validateAllFormFields(this.addForm);
      return;
    }
    let discipline: Discipline = this.addForm.getRawValue();

    console.log(discipline);

    this.apiDisciplines.createDisciplineUsingPOST(discipline)
      .subscribe(
        data => {
          if (data) {
            this.showSnack('дисциплината беше добавена', '', 1300);
            this.goBack();
          } else {
            alert('disciplines fetch failed');
          }
        }
      );
  }

  displayLector(userId: number): string {
    return ' BRADA';
  }
}
