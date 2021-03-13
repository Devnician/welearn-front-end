import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BaseComponent } from 'src/app/base/base.component';
import { DonkeyService } from 'src/app/core/donkey.service';
import { DialogModalComponent } from 'src/app/dialog-modal/dialog-modal.component';
import { EventWL } from 'src/app/model/event.model';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss']
})
export class ListEventComponent extends BaseComponent implements OnInit {
  disableEdit:boolean =false;
  displayedColumns = ['id',  'type', 'subject','starDateTime','endDateTime', /*'owner', 'group', */  'edit', 'delete'];
  events:EventWL[]=[];
  constructor(app: AppComponent, ar: ActivatedRoute,  public dialog: MatDialog,) {
    super(ar);
  }

  ngOnInit(): void {
  }

  addEvent(){
    this.router.navigate(['home/list-event/add-event']);
   //this.openDialog(undefined);
  }

  openRoom(){
    this.router.navigate(['home/list-event/room']);
  }

  // openDialog(event: EventWL) {
  //   let m: string = event ? 'edit' : 'create';
  //   const dialogRef = this.dialog.open(DialogModalComponent, {
  //     width: '80vw',
  //     height: '80vh',
  //     panelClass: 'my-full-screen-dialog',
  //     data: { obj: event, mode: m, classType: 'event' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       let event: EventWL = result.data;
  //       event.createdBy = this.user.id;
  //       if (m == 'edit') {
  //         // this.api.updateEqupmnet(eq).subscribe(
  //         //   data => {
  //         //     this.showSnack('Done.', "", 2000);
  //         //     this.loadEquipmentTypes();
  //         //   }
  //         // );
  //       } else if (m == 'create') {
  //         // this.api.addEqupmnet(eq).subscribe(data => {
  //         //   if (data.message.toLowerCase().includes('exist')) {
  //         //     this.showSnack('Съществува оборудване със същото наименование', "", 5000);
  //         //   } else {
  //         //     this.showSnack('Done.', "", 2000);
  //         //     this.loadEquipmentTypes();
  //         //   }
  //         // });
  //       }
  //     }
  //   });
  // }

}
