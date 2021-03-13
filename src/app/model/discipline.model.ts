import { User } from "./user.model";

export class Discipline{
    id:number;
    name:string;
    createdAt:any;
    updatedAt:any;



     
    lector:User;
    assistent:User;
}