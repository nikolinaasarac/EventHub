export class OrganizerStatisticsDto {
  totalEvents: number;
  activeEvents: number;
  finishedEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;

  ticketsPerEvent: TicketPerEvent[];

  ticketsPerDay: TicketPerDay[];
}

export class TicketPerEvent {
  eventId: number;
  eventTitle: string;
  ticketsSold: number;
}

export class TicketPerDay {
  date: string;
  ticketsSold: number;
}
