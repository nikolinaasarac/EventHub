import BaseService from "@/services/base.service";
import {Event} from "@/models/event.model";
import {QueryParams} from "@/models/query-params.model";
import {PaginatedResponse} from "@/models/paginated.model";

export class FavoriteEventsService {
	static readonly ENDPOINT = "/favorite-events"

	static async getMyFavoriteEventsPaginated(queryParams: QueryParams): Promise<PaginatedResponse<Event>> {
		return BaseService.fetchList(`${this.ENDPOINT}/paginated`, queryParams);
	}

	static async getMyFavoriteEvents(): Promise<Event[]> {
		return BaseService.fetchList<Event[]>(`${this.ENDPOINT}`);
	}

	static async addToFavoriteEvents(eventId: number) {
		return BaseService.create(`${this.ENDPOINT}/${eventId}`);
	}

	static async removeFromFavoriteEvents(eventId: number) {
		return BaseService.delete(`${this.ENDPOINT}/${eventId}`);
	}
}