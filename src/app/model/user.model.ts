import { Role } from "./role.model";

export class User {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  password: string;
  address: string;
  birthDate: Date;
  deleted: number;
  email: string;
  role: Role;
  loggedIn: number;
  phoneNumber: string;
  groupId: string;

  //TODO--process this arrays
  assistedDisciplineIds: any[];
  blackListedEventIds: any[];
  evaluationMarks: any[];
  taughtDisciplineIds: any[];



}