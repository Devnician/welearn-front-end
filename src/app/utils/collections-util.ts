import { Injectable } from '@angular/core';
import { EventDto, GroupDto, UserDto } from 'libs/rest-client/src';

@Injectable()
export class CollectionsUtil {
  constructor() {}

  filterEventsAccordingUserRole(events: EventDto[], user: UserDto): EventDto[] {
   
    switch (user.role.role) {
      case 'administrator':
      case 'observe':
        break;
      case 'teacher':
        events = events.filter(
          (ev) =>
            ev.discipline.teacher?.userId === user.userId ||
            ev.discipline.assistant?.userId === user.userId
        );
        break;
      case 'student': 
        if (user.groupId) {
          events = events.filter((ev) => ev.groupId === user.groupId);
        } else {
          return [];
        }
        break; 
      default:
        break;
    }  
    return events;
  }

  filterGroupsAccordingUserRole(groups: GroupDto[], user:UserDto) {
  
    
    switch (user.role.role) {
      case 'administrator':
      case 'observe':
        break;
      case 'teacher':
     
        groups = groups.filter(
          (gr) =>   gr.disciplines.findIndex( element => (element.teacher?.userId === user.userId || element.assistant?.userId === user.userId)  )  > -1  
        );
      
        break;
      case 'student': 
        if (user.groupId) {
          groups = groups.filter((ev) => ev.groupId === user.groupId);
        } else {
          return [];
        }
        break; 
      default:
        break;
    } 
  
    return groups;
  }

  // public getUsers(): User[] {
  //   let users: User[] = [];
  //   let user: User = new User();
  //   user.userId = 'abcd';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.email = 'super@domain.com';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.firstName = 'Админ';
  //   user.middleName = 'Системов';
  //   user.lastName = 'Админов';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 1;
  //   user.username = 'Adm9iertuNhkasdfg';
  //   user.password = '*****';
  //   user.loggedIn = 1;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4
  // gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   user = new User();
  //   user.userId = 'abcdd';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.email = 'super@domain.com';
  //   user.firstName = 'Красимира';
  //   user.middleName = 'Николаева';
  //   user.lastName = 'Николова';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 2;
  //   user.username = 'kiki';
  //   user.password = '*****';
  //   user.loggedIn = 1;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG
  // 4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   user = new User();
  //   user.userId = 'abcdds';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.email = 'super@domain.com';
  //   user.firstName = 'Стефания';
  //   user.middleName = 'Николаева';
  //   user.lastName = 'Колева';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 2;
  //   user.username = 'kiki';
  //   user.password = '*****';
  //   user.loggedIn = 1;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG
  // 4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   user = new User();
  //   user.userId = 'abcddsd';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.email = 'super@domain.com';
  //   user.firstName = 'Драгомир';
  //   user.middleName = 'Драгомиров';
  //   user.lastName = 'Драгомиров';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 2;
  //   user.username = 'kiki';
  //   user.password = '*****';
  //   user.loggedIn = 1;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG
  // 9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   user = new User();
  //   user.userId = 'abcddsdf';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.email = 'super@domain.com';
  //   user.firstName = 'Драгомир';
  //   user.middleName = 'Пентев';
  //   user.lastName = 'Кирилов';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 3;
  //   user.username = 'dodo';
  //   user.password = '*****';
  //   user.loggedIn = 0;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I
  // kpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   user = new User();
  //   user.userId = 'abcddsdfd';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.email = 'super@domain.com';
  //   user.firstName = 'Иван';
  //   user.middleName = 'Иванов';
  //   user.lastName = 'Иванов';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 3;
  //   user.username = 'dodo';
  //   user.password = '*****';
  //   user.loggedIn = 0;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6
  // IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   user = new User();
  //   user.userId = 'abcddsdfdg';
  //   user.birthDate = new Date();
  //   user.address = 'Пловдив, ул. 24-ти май № 24';
  //   user.phoneNumber = '0899123456';
  //   user.otherContacts = '';
  //   user.email = 'super@domain.com';
  //   user.firstName = 'Стоян';
  //   user.middleName = 'Стоянов';
  //   user.lastName = 'Стоянов';
  //   user.role = '';
  //   user.roleBg = '';
  //   user.roleId = 3;
  //   user.username = 'dodo';
  //   user.password = '*****';
  //   user.loggedIn = 0;
  //   user.deleted = 0;
  //   user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4
  // gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  //   users.push(user);
  //   return users;
  // }
  // getRoles(): Role[] {
  //   let roles: Role[] = [];
  //   let role: Role = new Role();
  //   role.id = 1;
  //   role.description = 'description';
  //   role.descriptionBg = 'description';
  //   role.role = 'administrator';
  //   role.roleBg = 'администратор';
  //   roles.push(role);
  //   role = new Role();
  //   role.id = 2;
  //   role.description = 'description';
  //   role.descriptionBg = 'description';
  //   role.role = 'teacher';
  //   role.roleBg = 'обучаващ';
  //   roles.push(role);
  //   role = new Role();
  //   role.id = 3;
  //   role.description = 'description';
  //   role.descriptionBg = 'description';
  //   role.role = 'trained';
  //   role.roleBg = 'обучаван';
  //   roles.push(role);
  //   return roles;
  // }
  // getGroups(): StudentsGroup[] {
  //   let list: StudentsGroup[] = [];
  //   let group: StudentsGroup = new StudentsGroup();
  //   group.id = 1;
  //   group.name = 'MSE2020';
  //   group.startDate = new Date();
  //   group.endDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
  //   group.open = 1;
  //   group.students.push(this.getUsers()[3]);
  //   group.students.push(this.getUsers()[4]);
  //   group.disciplines = this.getDisciplines();
  //   list.push(group);
  //   group = new StudentsGroup();
  //   group.id = 2;
  //   group.name = 'MSE2021';
  //   group.startDate = new Date();
  //   group.endDate = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
  //   group.open = 0;
  //   // group.students.push(this.getUsers()[2]);
  //   group.disciplines = this.getDisciplines();
  //   list.push(group);
  //   return list;
  // }
  // getDisciplines(): Discipline[] {
  //   let lectors = this.getUsers().filter(user => user.roleId === 2);
  //   let list: Discipline[] = [];
  //   list.push({ id: 'asd', name: 'ООП', createdAt: new Date(), updatedAt: new Date(),
  // lectorId: lectors[0].userId, lector: lectors[0]} as Discipline);
  //   list.push({ id: 'asdd', name: 'БАЗИ ДАННИ', createdAt: new Date(),
  // updatedAt: new Date(), lectorId: lectors[1].userId, lector: lectors[1] } as Discipline);
  //   list.push({ id: 'asdf', name: 'ПРАКТИКУМ 1', createdAt: new Date(), updatedAt:
  // new Date(), lectorId: lectors[2].userId, lector: lectors[2] } as Discipline);
  //   list.push({ id: 'asds', name: 'ПСС', createdAt: new Date(), updatedAt: new Date() } as Discipline);
  //   list.push({ id: 'asdq', name: 'КСМ', createdAt: new Date(), updatedAt: new Date() } as Discipline);
  //   return list;
  // }
}
