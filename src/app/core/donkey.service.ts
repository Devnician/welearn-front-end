import { Injectable } from '@angular/core';
import { MenuOptions } from '../model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class DonkeyService {
  private data: any;
  private info: string;
  private flag: boolean;
  private menu: MenuOptions; //parent menu with user rights
  private loaded: boolean = false;

  setFlag(flag: boolean) {
    this.flag = flag;
  }
  getFlag() {
    return this.flag;
  }
  setMenu(menu: MenuOptions) {
    this.menu = menu;
  }
  getMenu(): MenuOptions {
    return this.menu;
  }

  setData(val: any) {
    this.data = val;
    this.loaded = true;
  }

  getData(): any {
    let res = this.data;
    delete this.data;
    delete this.info;
    this.loaded = false;
    return res;
  }

  setInfo(info: string) {
    this.info = info;
  }

  getInfo(): string {
    return this.info;
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
