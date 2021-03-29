/**
 * Model for MENU with properties for decoration and user rights
 */
export class MenuOptions {
    key: number
    value: string;
    route: string;
    matIcon: string;

    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    preview: boolean = true;
}