/**
 * Model for MENU with properties for decoration and user rights
 */
export class MenuOptions {
  key: number;
  value: string;
  route: string;
  matIcon: string;

  add = false;
  edit = false;
  delete = false;
  preview = true;
}
