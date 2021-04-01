import { Group } from "./group.model";
import { User } from "./user.model";

export class EventWL {
    id: number;
    type: string;
    subject: string;
    createdAt: any;
    createdBy: number;
    ownerId: number;
    starDateTime: any;
    endDateTime: any;
    description: string;
    groupId: number;
    updatedAt: any;

    //transient
    group: Group;
    owner: User;
}