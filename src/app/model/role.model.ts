import { RoleDto } from 'libs/rest-client/src';
import { MenuOptions } from './menu.model';

export class Role implements RoleDto {
  id: number;
  role: string;
  description: string;
  roleBg: string;
  descriptionBg: string;
  permissions: string;

  //this will be loaded after login in AppComponent
  menus: MenuOptions[] = [];
}
