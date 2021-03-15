import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseformComponent } from 'src/app/baseform/baseform.component';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.scss']
})
export class AddDisciplineComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
    });
  }

  reset() {
    this.addForm.reset();
  }

  onSubmit() {
    if (!this.addForm.valid) {
      this.valido.validateAllFormFields(this.addForm);
      return;
    }
  }

}
