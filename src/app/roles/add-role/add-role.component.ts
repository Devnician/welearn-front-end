import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent extends BlitcenComponent implements OnInit {

  constructor() {
    super();
  }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      role: ['', Validators.required],
      description: ['', Validators.required],
      roleBg: ['', Validators.required],
      descriptionBg: ['', Validators.required],
    });

  }

  onSubmit() {
    // this.api.createRole(this.addForm.value)
    //   .subscribe(data => {
    //     this.router.navigate(['home/list-role']);
    //   });
  }
}
