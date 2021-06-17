import { Component, Injector, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResourceControllerService } from 'libs/rest-client/src';
import { BlitcenComponent } from 'src/app/blitcen/blitcen.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { FileUtil } from 'src/app/utils/file-util';
import { ExamMaterialsComponent } from '../exam-materials/exam-materials.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends BlitcenComponent implements OnInit {
  fileUtil: FileUtil;
  eventDto;
  availablefiles;
  blink = false;
  private interval: any;
  
  
  constructor( 
    @Optional()  private dialogRef: MatDialogRef<ExamMaterialsComponent>,
   private dialog:MatDialog,
    private donkey: DonkeyService,
    private resourceControllerService: ResourceControllerService,
    private s: MatSnackBar, 
    injector: Injector
  ) {
    super(injector, s);
    this.addAuthorizationToService(resourceControllerService);
    this.fileUtil = new FileUtil(this.resourceControllerService, this);

    if (donkey.isLoaded()) {
      this.eventDto = donkey.getData();
      console.log(this.eventDto);
    }
  }

  ngOnInit(): void {
    let fileIds = this.eventDto.resourceIds;
    if (fileIds.length > 0) {
      fileIds.forEach((file) => {
        this.resourceControllerService
          .getByIdUsingGET2(file)
          .subscribe((dto) => {
            this.fileUtil.push(dto);
            this.availablefiles = this.fileUtil.resources.length;
          });
      });

      this.interval = setInterval(() => {
        this.blink = true;
    setTimeout(function(){this.blink = false;}.bind(this),300)
      }, 2500);
    }
  }
 
  downloadFiles() {
    console.log('download');
    if (this.fileUtil.resources.length > 0) {
      this.fileUtil.resources.forEach(f => {
        this.fileUtil.downloadExistingFile(f);
      }) 
    }  
    clearInterval(this.interval);
  }

  openExamUploadDialog() {

    const config = new MatDialogConfig();
    config.closeOnNavigation = false;
    config.disableClose = true;
    config.data = { 
      data: {
        user: this.user,
        event: this.eventDto
      },
    }
    const dialogRef = this.dialog.open(ExamMaterialsComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.dialogRef.close();
        // console.log('result: ');
        // console.log(result.data);
      }
    });
  }
}
