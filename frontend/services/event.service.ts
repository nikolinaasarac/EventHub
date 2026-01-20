import BaseService from "@/services/base.service";
import {Event} from "@/models/event.model";

export default class EventService {
	static readonly ENDPOINT = "/events"

	static async getEvents() {
		return BaseService.fetchList<Event[]>(`${this.ENDPOINT}`);
	}

	static async getEvent(id: string) {
		return BaseService.fetch<Event>(`${this.ENDPOINT}/${id}`);
	}
}