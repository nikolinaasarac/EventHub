import {EventMetadata} from "@/models/event-metadata.model";
import {Venue} from "@/models/venue.model";
import {EventSubcategory} from "@/models/event-subcategory.model";

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
	createdAt: string;
	updatedAt: string;
}