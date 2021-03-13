import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  label: string;
  singleMessage: string;
  messages: string[];
}

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.scss']
})

export class DialogInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  onNoClick(): void {
    this.dialogRef.close({ res: 'declined' });
  }

  onYesClick(): void {
    this.dialogRef.close({ res: 'confirmed' });
  }
}
