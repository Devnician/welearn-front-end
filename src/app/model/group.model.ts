import { Discipline } from "./discipline.model";

export class Group {

    id: number;
    name: string;
    description: string;
    startDate: any;
    endDate: any;
    maxResourceMB: number;

    createdDate: any;
    modifiedDate: any;

    disciplines: Discipline[];


}