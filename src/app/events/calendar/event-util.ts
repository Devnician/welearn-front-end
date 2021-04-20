import { EventInput } from '@fullcalendar/angular';
import * as moment from 'moment';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'Бази данни, тип: Лекция ',
        start: moment().add(-3, 'days').startOf('day').add(9, 'hour').toISOString()
    },
    {
        id: createEventId(),
        title: 'ООП, тип: Лекция ',
        start: moment().add(-2, 'days').startOf('day').add(9, 'hour').toISOString()// TODAY_STR + 'T08:00:00'
    },
    {
        id: createEventId(),
        title: 'ООП, тип: Лекция ',
        start: moment().add(-2, 'days').startOf('day').add(9, 'hour').toISOString(), // TODAY_STR + 'T08:00:00',
        color: "red"
    },
    {
        id: createEventId(),
        title: 'ООП, тип: Изпит',
        start: moment().add(-2, 'days').startOf('day').add(12, 'hour').toISOString()// TODAY_STR + 'T12:00:00'
    }
];

export function createEventId() {
    return String(eventGuid++);
}

