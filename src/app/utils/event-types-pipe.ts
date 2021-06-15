import { Pipe, PipeTransform } from "@angular/core";
import EVENT_TYPES from "../events/event-types";

/*
 * Usage:
 *   value | eventType
 * Example:
 *   {{ EVENT_TYPES.Consultation |  eventType }}
 *   formats to: Консултация
 */
@Pipe({ name: 'eventType' })
export class NomenclatureUnitPipe implements PipeTransform {
    transform(value: EVENT_TYPES): string { 
    return EVENT_TYPES[value];
  }
} 
