export interface OrganizerStatistics {
	totalEvents: number;
	activeEvents: number;
	finishedEvents: number;
	totalTicketsSold: number;
	totalRevenue: number;

	ticketsPerEvent: {
		eventId: number;
		eventTitle: string;
		ticketsSold: number;
	}[];

	ticketsPerDay: {
		date: string;
		ticketsSold: number;
	}[];
}
