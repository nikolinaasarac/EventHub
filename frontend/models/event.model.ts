import {EventMetadata} from "@/models/event-metadata.model";
import {Venue} from "@/models/venue.model";
import {EventSubcategory} from "@/models/event-subcategory.model";
import {TicketType} from "@/models/ticket-type.model";

export interface Event {
	id: number;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	imageUrl: string;
	status: 'Zakazan' | 'Otkazan' | 'Zavrsen';
	venue: Venue;
	eventSubcategory: EventSubcategory;
	metadata: EventMetadata;
	ticketTypes: TicketType[];
	createdAt: string;
	updatedAt: string;
}