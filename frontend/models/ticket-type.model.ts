import {Event} from "@/models/event.model";

export interface TicketType {
	id: number,
	name: string,
	price: number,
	totalQuantity: number,
	soldQuantity: number
	event: Event
}