import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ScheduleDto } from "libs/rest-client/src";

@Component({
  selector: "app-edit-schedule",
  templateUrl: "./edit-schedule.component.html",
  styleUrls: ["./edit-schedule.component.scss"],
})
export class EditScheduleComponent implements OnInit {
  title = "";
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ScheduleDto,
    private dialogRef: MatDialogRef<EditScheduleComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.title = "edit";
    } else {
      this.title = "create";
    }

    this.buildFrorm();
  }
  buildFrorm() {
    this.addForm = this.fb.group({
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      monday: [false],
      monStart: [""],
      // monEnd: [],
      tuesday: [false],
      wednesday: [true],
      thursday: [false],
      friday: [false],
    });
  }

  close() {
    this.dialogRef.close();
  }
  reset() {
    alert("clear form");
  }
  submit() {
    console.log("submit");
  }
  timeChangeHandler(e: any) {
    console.log(e);
  }
}
