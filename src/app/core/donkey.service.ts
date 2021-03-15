import { Injectable } from '@angular/core';
import { Menu } from '../model/menu.model';

@Injectable()
export class DonkeyService {
    private data: any;
    private info: string;
    private flag: boolean;
    private menu: Menu; //parent menu with user rights
    private loaded: boolean = false;

    constructor() { }
    setFlag(flag: boolean) {
        this.flag = flag;
    }
    getFlag() {
        return this.flag;
    }
    setMenu(menu: Menu) {
        this.menu = menu;
    }
    getMenu(): Menu {
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

    isLoaded(): boolean { return this.loaded }



}