
import { UserDto } from 'libs/rest-client/src';

export class Discipline {
    id: string;
    name: string;
    creationDate: any;
    modifiedDate: any;

    lector: UserDto;
    assistant: UserDto;

    // resources: any;

    //transient
    lectorId: string = '';
    assitantId: string = '';
    //transient
    mark: number;
}