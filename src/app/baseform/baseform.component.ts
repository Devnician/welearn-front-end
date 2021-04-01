import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { BlitcenComponent } from '../blitcen/blitcen.component';
import { Role } from '../model/role.model';

export class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-baseform',
  template: 'NO UI TO BE FOUND HERE!',
  styleUrls: ['./baseform.component.scss']
})

export class BaseformComponent extends BlitcenComponent implements OnInit {
  passFieldType: string = 'password';
  roles: Role[] = [];
  constructor() {
    super();
    this.roles = AppComponent.myapp.roles;
  }
  ngOnInit() {
  }

  /**
   * Mighty eye 
   */
  changePassType() {
    this.passFieldType = this.passFieldType === 'text' ? 'password' : 'text';
  }

  goBack() {
    history.back();
  }
}
