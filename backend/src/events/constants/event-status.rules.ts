import { Event } from '../entities/event.entity';
import { EventStatus } from '../../../shared/enums/event-status.enum';
import { StatusRule } from '../../../shared/status-engine/interfaces/status-rule.interface';

export const eventStatusRules: StatusRule<Event, EventStatus>[] = [
  {
    from: EventStatus.ZAKAZAN,
    to: EventStatus.ZAVRSEN,
    condition: (event, now) => now > event.endDate,
  },
];
