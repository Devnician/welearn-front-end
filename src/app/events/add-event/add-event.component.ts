import { Component, Inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventDto, GroupDto, UserDto } from 'libs/rest-client/src';
import { BaseformComponent } from 'src/app/baseform/baseform.component';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent extends BaseformComponent implements OnInit {
  addForm: FormGroup;
  minDate: Date = new Date();
  eventTypes: String[] = ['обучение', 'упражнение', 'консултация', 'изпит'];
  groups: GroupDto[] = [];
  owners: UserDto[] = [];
  disciplines: Discipline[] = [];

  constructor(injector: Injector, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: EventDto,

    private dialogRef: MatDialogRef<AddEventComponent>,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id: [],
      type: ['', Validators.required],
      subject: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      description: ['', Validators.required],
      discipline: ['', Validators.required],
      //transient
      group: ['', ''],
      owner: ['', ''],
    });


    // this.groups = AppComponent.collections.getGroups();
    // this.owners = AppComponent.collections.getUsers().filter(user=>user.roleId == 2) ;
    console.log(this.owners);
  }


  /**
 * Checks field
 * @param field the field
 * return True if it is valed false otherwise
 */
  isFieldValid(field: string) {
    return !this.addForm.get(field).valid && this.addForm.get(field).touched;
  }

  /**
   * Clear form
   */
  reset() {
    this.addForm.reset();
  }

  /**
   * Submit form if is valid
   */
  onSubmit() {
    if (!this.addForm.valid) {
      //Check before..
      this.valido.validateAllFormFields(this.addForm);
      return;
    }
    let newEvent: EventDto = this.addForm.value;
    console.log(newEvent);
  }

}
