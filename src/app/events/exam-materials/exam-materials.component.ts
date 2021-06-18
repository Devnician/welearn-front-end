import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventDto, ResourceControllerService } from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { FileUtil } from 'src/app/utils/file-util';

@Component({
  selector: 'app-exam-materials',
  templateUrl: './exam-materials.component.html',
  styleUrls: ['./exam-materials.component.scss'],
})
export class ExamMaterialsComponent extends BlitcenComponent implements OnInit {
  fileUtil: FileUtil;
  eventDto: EventDto;
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
 
      this.eventDto = data.data.event;
    console.log(this.eventDto)
   // return;
  }

  ngOnInit(): void {}
 
  sendFilesToServer() {
    
    this.fileUtil.saveFilesForEvent(this.eventDto.eventId,true);
    this.dialogRef.close(); 
  }
}
