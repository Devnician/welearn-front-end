import { Menu } from './menu.model';

export class Role {
    id: number;
    role: string;
    description: string;
    roleBg: string;
    descriptionBg: string;
    menus: Menu[] = [];
}