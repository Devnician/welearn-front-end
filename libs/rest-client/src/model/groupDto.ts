/**
 * WeLearn backend API
 * C1 version of the WeLearn Backend API
 *
 * OpenAPI spec version: 1.0
 * Contact: ivelin.dimitrov9@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DisciplineDto } from './disciplineDto';
import { EventDto } from './eventDto';
import { ResourceDto } from './resourceDto';
import { ScheduleDto } from './scheduleDto';
import { UserDto } from './userDto';


export interface GroupDto { 
    description?: string;
    disciplines?: Array<DisciplineDto>;
    endDate?: Date;
    events?: Array<EventDto>;
    groupId?: string;
    maxResourcesMb?: number;
    name?: string;
    resources?: Array<ResourceDto>;
    schedules?: Array<ScheduleDto>;
    startDate?: Date;
    users?: Array<UserDto>;
}
