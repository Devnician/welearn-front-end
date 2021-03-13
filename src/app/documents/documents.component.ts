import { Component, OnInit } from '@angular/core';
import { BlitcenComponent } from '../blitcen/blitcen.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent extends BlitcenComponent implements OnInit {

  constructor() {
    super();
  }

  parents: any[] = [];

  ngOnInit(): void {

    this.parents.push({
      'id': 1, name: "Protocols", expanded: false,
      children: [{ id: 11, name: "PPP_Telenor" },
      { id: 12, name: "PPP_Telenor - Демонтаж" },
      { id: 13, name: "PPP_Telenor - Демонтаж и Монтаж" },
      { id: 14, name: "PPP_Telenor - Монтаж на демонтирано у-во" },
      { id: 15, name: "PPP_Telenor - Монтаж на Допълнително оборудване" },
      { id: 16, name: "PPP_Telenor - Ремонтни Дейности - много МПС-та" },
      { id: 17, name: "PPP_Telenor - Ремонтни Дейности" }
      ]
    });

    this.parents.push({
      'id': 2, name: "Други", expanded: false, children: [
        { id: 21, name: "док 1" },
        { id: 22, name: "док 2" }
      ]
    });

  }
  loadChildDoc(parent: any, child: any) {

    // if (parent.id === 1) {
    //   this.api.downloadProtocol(child.name).subscribe(data => {

    //     let blob = this.getWordBlobFromByteArray(data.result);

    //     var blobURL = (window.URL || window.webkitURL).createObjectURL(blob);

    //     this.fetchFile(child.name + ".doc", blobURL);
    //     this.showSnack("Done.", "", 1000);
    //   })
    // } else if (parent.id === 2) {
    //   alert('not imlemented yet');
    // } 
  }

  showHide(parent: any) {
    let par = this.parents.find(p => p.id === parent.id);
    par.expanded = !par.expanded;
    this.parents.forEach(e => {
      if (e.id !== parent.id) {
        e.expanded = false;
      }
    })
  }

}
