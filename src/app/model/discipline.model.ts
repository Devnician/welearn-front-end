import { User } from "./user.model";

export class Discipline {
    id: number;
    name: string;
    createdAt: any;
    updatedAt: any;

    lectorId: number;
    assitentId: number;

    //transient
    lector: User;
    assistant: User;
}