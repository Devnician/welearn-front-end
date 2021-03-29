import { MenuOptions } from "../model/menu.model";
import { Role } from "../model/role.model";

export class MenuUtil {

    static determineSelectedMenusForThisRole(role: Role, selectedMenus: MenuOptions[], allMenus: MenuOptions[]) {
        let permissions: any[] = JSON.parse(role.permissions);
        permissions.forEach(perm => {
            let roleId = perm[0];
            let m: MenuOptions = allMenus.find(menu => menu.key === roleId);
            m.add = perm[1] === 1;
            m.edit = perm[2] === 1;
            m.delete = perm[3] === 1;
            m.preview = perm[4] === 1;
            selectedMenus.push(m);
        });
    }

    // public static getAdminMenus(): any {
    //     let roleMenus = [];
    //     roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', add: true, edit: true, delete: true });
    //     roleMenus.push({ key: 2, value: 'wl.roles', route: '/home/list-role', matIcon: 'person_pin', add: true, edit: true, delete: true });
    //     roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', add: true, edit: true, delete: true });
    //     roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', add: true, edit: true, delete: true });
    //     roleMenus.push({ key: 6, value: 'wl.schedule', route: '/home/list-schedule', matIcon: 'events', add: true, edit: true, delete: true });
    //     return roleMenus;
    // }
    // public static getTeacherMenus(): any {
    //     let roleMenus = [];
    //     roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', add: true, edit: false, delete: false });
    //     roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', add: true, edit: true, delete: false });
    //     roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', add: true, edit: false, delete: false });
    //     roleMenus.push({ key: 6, value: 'wl.schedule', route: '/home/list-schedule', matIcon: 'events', add: true, edit: true, delete: false });
    //     roleMenus.push({ key: 3, value: 'wl.events', route: '/home/list-event', matIcon: 'event_note', add: true, edit: true, delete: false });
    //     return roleMenus;
    // }
    // public static getTrainedMenus(): any {
    //     let roleMenus = [];
    //     roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', add: false, edit: false, delete: false });
    //     roleMenus.push({ key: 3, value: 'wl.events', route: '/home/list-event', matIcon: 'event_note', add: false, edit: false, delete: false });
    //     roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', add: false, edit: false, delete: false });
    //     roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', add: false, edit: false, delete: false });
    //     return roleMenus;
    // }

    public static getAllMenus(): MenuOptions[] {
        let roleMenus = [];
        roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', });
        roleMenus.push({ key: 2, value: 'wl.roles', route: '/home/list-role', matIcon: 'person_pin', });
        roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', });
        roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', });
        roleMenus.push({ key: 6, value: 'wl.schedule', route: '/home/list-schedule', matIcon: 'events', });
        return roleMenus;
    }

}