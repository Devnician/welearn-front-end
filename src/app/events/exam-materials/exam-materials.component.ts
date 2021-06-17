import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResourceControllerService } from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { FileUtil } from 'src/app/utils/file-util';

@Component({
  selector: 'app-exam-materials',
  templateUrl: './exam-materials.component.html',
  styleUrls: ['./exam-materials.component.scss'],
})
export class ExamMaterialsComponent extends BlitcenComponent implements OnInit {
  fileUtil: FileUtil;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef: MatDialogRef<ExamMaterialsComponent>,
    private dialog: MatDialog,
    injector: Injector,
    private s: MatSnackBar,
    private resourceControllerService: ResourceControllerService
  ) {
    super(injector, s);
    this.addAuthorizationToService(resourceControllerService);
    this.fileUtil = new FileUtil(this.resourceControllerService, this);

    if (data) {
      console.log(data);
    }
  }

  ngOnInit(): void {}

  onFileDropped($event) {
     

    console.log('file was dropped');
    // this.fileUtil.onFileDropped($event,id, 'event');
  }
  sendFilesToServer(){
    console.log('upload');
    this.dialogRef.close();
  }
}
