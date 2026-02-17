import BaseService from "@/services/base.service";
import {Event} from "@/models/event.model";
import {QueryParams} from "@/models/query-params.model";
import {PaginatedResponse} from "@/models/paginated.model";

export default class EventService {
	static readonly ENDPOINT = "/events"

	static async getEvents(queryParams: QueryParams): Promise<PaginatedResponse<Event>> {
		return BaseService.fetchList(`${this.ENDPOINT}`, queryParams);
	}

	static async getMyOrganizedEvents(queryParams: QueryParams): Promise<PaginatedResponse<Event>> {
		return BaseService.fetchList(`${this.ENDPOINT}/my-events`, queryParams);
	}

	static async getAllEvents(): Promise<Event[]> {
		return BaseService.fetchList<Event[]>(`${this.ENDPOINT}/all-events`);
	}

	static async getEvent(id: string) {
		return BaseService.fetch<Event>(`${this.ENDPOINT}/${id}`);
	}

	static async createEvent(formData: FormData): Promise<Event> {
		return BaseService.create(`${this.ENDPOINT}`, formData);
	}

	static async deleteEvent(id: string) {
		return BaseService.delete(`${this.ENDPOINT}/${id}`);
	}

	static async updateEvent(id: number, formData: FormData): Promise<Event> {
		return BaseService.update(`${this.ENDPOINT}/${id}`, formData);
	}
}