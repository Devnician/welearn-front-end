// import { UserDto } from "libs/rest-client/src";
// import { Role } from "./role.model";

import { UserDto } from "libs/rest-client/src";
import { Role } from "./role.model";


export class User implements UserDto {
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    username: string;
    password: string;
    address: string;
    birthdate: Date;
    deleted: number;
    email: string;
    loggedIn: number;
    phoneNumber: string;
    groupId: string;
    role: Role;


    //TODO--process this arrays
    // assistedDisciplineIds: any[];
    // blackListedEventIds: any[];
    // evaluationMarks: any[];
    // taughtDisciplineIds: any[]; 

    // assistedDisciplineIds?: Array<string>;   
    // blackListedEventIds?: Array<string>;   
    // evaluationMarks?: Array<EvaluationMarkDto>; 
    // taughtDisciplineIds?: Array<string>; 

    token: string = '';
}