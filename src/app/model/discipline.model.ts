import { User } from "./user.model";

export class Discipline {
    id: string;
    name: string;
    createdAt: any;
    updatedAt: any;
    lector: User;
    assistant: User;
    resources: any;

    //transient
    lectorId: string;
    assitantId: string;
    //transient
    mark: number;
}