import { UserDto } from '../../../libs/rest-client/src/model/userDto';
import { Group } from "./group.model";

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
    owner: UserDto;
}