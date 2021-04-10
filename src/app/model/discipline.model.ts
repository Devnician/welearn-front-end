
import { DisciplineDto, UserDto } from 'libs/rest-client/src';

export class Discipline implements DisciplineDto {
    id: string;
    name: string;
    creationDate: any;
    modifiedDate: any;
    teacher: UserDto;
    assistant: UserDto;

    //transient
    lectorId: string = '';
    assitantId: string = '';
    //transient
    mark: number;


    // resourceIds?: Array<string>;
    // teacher?: UserDto;
}