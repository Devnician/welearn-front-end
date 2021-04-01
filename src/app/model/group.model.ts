import { Discipline } from "./discipline.model";
import { EventWL } from "./event.model";
import { User } from "./user.model";

export class Group {
    groupId: number;
    name: string;
    startDate: any;
    endDate: any;
    description: string;
    maxResourcesMb: number;
    // open: number;
    users: User[] = [];
    disciplines: Discipline[] = [];
    events: EventWL[] = [];

    /////
    //todo
    schedules: any;
    resources: any;
    // private Set<ScheduleDto> schedules; 
    // private Set<ResourceDto> resources;
}






