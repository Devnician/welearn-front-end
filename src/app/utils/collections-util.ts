import { Discipline } from "../model/discipline.model";
import { MenuOptions } from "../model/menu.model";
import { Role } from "../model/role.model";
import { StudentsGroup } from "../model/students-group.model";
import { User } from "../model/user.model";

export class CollectionsUtil {


  public getAdminMenus(): any {
    let roleMenus = [];
    roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', edit: true });
    roleMenus.push({ key: 2, value: 'wl.roles', route: '/home/list-role', matIcon: 'person_pin', edit: true });
    roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', edit: true });
    roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', edit: true });
    roleMenus.push({ key: 6, value: 'wl.schedule', route: '/home/list-schedule', matIcon: 'events', edit: true });
    return roleMenus;
  }
  public getTeacherMenus(): any {
    let roleMenus = [];
    roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', edit: false });
    roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', edit: true });
    roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', edit: false });
    roleMenus.push({ key: 6, value: 'wl.schedule', route: '/home/list-schedule', matIcon: 'events', edit: true });
    roleMenus.push({ key: 3, value: 'wl.events', route: '/home/list-event', matIcon: 'event_note', edit: true });
    return roleMenus;
  }
  public getTrainedMenus(): any {
    let roleMenus = [];
    roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', edit: false });
    roleMenus.push({ key: 3, value: 'wl.events', route: '/home/list-event', matIcon: 'event_note', edit: false });
    roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', edit: false });
    roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', edit: false });
    return roleMenus;
  }

  public getAllMenus(): MenuOptions[] {
    let roleMenus = [];
    roleMenus.push({ key: 1, value: 'wl.users', route: '/home/list-user', matIcon: 'supervised_user_circle', edit: true });
    roleMenus.push({ key: 2, value: 'wl.roles', route: '/home/list-role', matIcon: 'person_pin', edit: true });
    roleMenus.push({ key: 4, value: 'wl.groups', route: '/home/list-group', matIcon: 'groups', edit: true });
    roleMenus.push({ key: 5, value: 'wl.disciplines', route: '/home/list-discipline', matIcon: 'book', edit: true });
    roleMenus.push({ key: 6, value: 'wl.schedule', route: '/home/list-schedule', matIcon: 'events', edit: true });
    return roleMenus;
  }

  public getUsers(): User[] {
    let users: User[] = [];

    let user: User = new User();
    user.id = 1;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.email = 'super@domain.com';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.firstName = 'Админ';
    user.middleName = 'Системов';
    user.lastName = 'Админов';
    user.role = '';
    user.roleBg = '';
    user.roleId = 1;

    user.username = 'Adm9iertuNhkasdfg';
    user.password = '*****';
    user.loggedIn = 1;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);


    user = new User();
    user.id = 2;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.email = 'super@domain.com';
    user.firstName = 'Красимира';
    user.middleName = 'Николаева';
    user.lastName = 'Николова';
    user.role = '';
    user.roleBg = '';
    user.roleId = 2;
    user.username = 'kiki';
    user.password = '*****';
    user.loggedIn = 1;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);

    user = new User();
    user.id = 8000;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.email = 'super@domain.com';
    user.firstName = 'Стефания';
    user.middleName = 'Николаева';
    user.lastName = 'Колева';
    user.role = '';
    user.roleBg = '';
    user.roleId = 2;
    user.username = 'kiki';
    user.password = '*****';
    user.loggedIn = 1;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);


    user = new User();
    user.id = 22;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.email = 'super@domain.com';
    user.firstName = 'Драгомир';
    user.middleName = 'Драгомиров';
    user.lastName = 'Драгомиров';
    user.role = '';
    user.roleBg = '';
    user.roleId = 2;
    user.username = 'kiki';
    user.password = '*****';
    user.loggedIn = 1;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);

    user = new User();
    user.id = 3;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.email = 'super@domain.com';
    user.firstName = 'Драгомир';
    user.middleName = 'Пентев';
    user.lastName = 'Кирилов';
    user.role = '';
    user.roleBg = '';
    user.roleId = 3;
    user.username = 'dodo';
    user.password = '*****';
    user.loggedIn = 0;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);
    user = new User();
    user.id = 4;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.email = 'super@domain.com';
    user.firstName = 'Иван';
    user.middleName = 'Иванов';
    user.lastName = 'Иванов';
    user.role = '';
    user.roleBg = '';
    user.roleId = 3;
    user.username = 'dodo';
    user.password = '*****';
    user.loggedIn = 0;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);
    user = new User();
    user.id = 5;
    user.birthDate = new Date();
    user.address = 'Пловдив, ул. 24-ти май № 24';
    user.phoneNumber = '0899123456';
    user.otherContacts = '';
    user.email = 'super@domain.com';
    user.firstName = 'Стоян';
    user.middleName = 'Стоянов';
    user.lastName = 'Стоянов';
    user.role = '';
    user.roleBg = '';
    user.roleId = 3;
    user.username = 'dodo';
    user.password = '*****';
    user.loggedIn = 0;
    user.deleted = 0;
    user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    users.push(user);




    return users;
  }

  getRoles(): Role[] {
    let roles: Role[] = [];
    let role: Role = new Role();
    role.id = 1;
    role.description = 'description';
    role.descriptionBg = 'description';
    role.role = 'administrator';
    role.roleBg = 'администратор';
    roles.push(role);

    role = new Role();
    role.id = 2;
    role.description = 'description';
    role.descriptionBg = 'description';
    role.role = 'teacher';
    role.roleBg = 'обучаващ';
    roles.push(role);
    role = new Role();

    role.id = 3;
    role.description = 'description';
    role.descriptionBg = 'description';
    role.role = 'trained';
    role.roleBg = 'обучаван';
    roles.push(role);
    return roles;
  }


  getGroups(): StudentsGroup[] {
    let list: StudentsGroup[] = [];

    let group: StudentsGroup = new StudentsGroup();
    group.id = 1;
    group.name = 'MSE2020';
    group.startDate = new Date();
    group.endDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
    group.open = 1;
    group.students.push(this.getUsers()[3]);
    group.students.push(this.getUsers()[4]);
    group.disciplines = this.getDisciplines();
    group.lectorId = 2;
    group.assitantId = 0;
    list.push(group);

    group = new StudentsGroup();
    group.id = 2;
    group.name = 'MSE2021';
    group.startDate = new Date();
    group.endDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
    group.open = 0;
    // group.students.push(this.getUsers()[2]);
    group.disciplines = this.getDisciplines();
    group.lectorId = 0;
    group.assitantId = 0;
    list.push(group);


    return list;
  }

  getDisciplines(): Discipline[] {
    let lectors = this.getUsers().filter(user => user.roleId === 2);
    // console.log(lectors);


    let list: Discipline[] = [];
    list.push({ id: 1, name: 'ООП', createdAt: new Date(), updatedAt: new Date(), lector: lectors[0] } as Discipline);
    list.push({ id: 2, name: 'БАЗИ ДАННИ', createdAt: new Date(), updatedAt: new Date(), lector: lectors[1] } as Discipline);
    list.push({ id: 3, name: 'ПРАКТИКУМ 1', createdAt: new Date(), updatedAt: new Date(), lector: lectors[2] } as Discipline);
    list.push({ id: 4, name: 'ПСС', createdAt: new Date(), updatedAt: new Date() } as Discipline);
    list.push({ id: 5, name: 'КСМ', createdAt: new Date(), updatedAt: new Date() } as Discipline);
    return list;
  }

}