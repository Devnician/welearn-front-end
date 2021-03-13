import { Discipline } from "./discipline.model";
import { User } from "./user.model";

export class StudentsGroup{
    id:number;
    name:string;
    startDate:any;
    endDate:any;
    open:number;
    students:User[]=[];
    disciplines:Discipline[]=[];

    lectorId:number;
    assitantId:number;

    //transient
    lector:User;
    assistant:User;
}