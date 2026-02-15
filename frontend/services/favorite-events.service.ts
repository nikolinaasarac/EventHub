import BaseService from "@/services/base.service";
import {Event} from "@/models/event.model";

export class FavoriteEventsService {
	static readonly ENDPOINT = "/favorite-events"

	static async getMyFavoriteEvents() {
		return BaseService.fetchList<Event[]>(`${this.ENDPOINT}`);
	}

	static async addToFavoriteEvents(eventId: number) {
		return BaseService.create(`${this.ENDPOINT}/${eventId}`);
	}

	static async removeFromFavoriteEvents(eventId: number) {
		return BaseService.delete(`${this.ENDPOINT}/${eventId}`);
	}
}