import {EventCategory} from "@/models/event-category.model";

export interface EventSubcategory {
	id: number
	name: string
	eventCategory: EventCategory
}