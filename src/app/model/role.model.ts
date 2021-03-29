import { MenuOptions } from "./menu.model";

export class Role {
    id: number;
    role: string;
    description: string;
    roleBg: string;
    descriptionBg: string;

    permissions: string;
    //this will be loaded after login in AppComponent
    menus: MenuOptions[] = [];

}