import {Venue} from "@/models/venue.model";
import BaseService from "@/services/base.service";
import {PaginatedResponse, Pagination} from "@/models/paginated.model";

export default class VenueService {
	static readonly ENDPOINT = "/venues"

	static async getVenues(pagination: Pagination): Promise<PaginatedResponse<Venue>> {
		return BaseService.fetchList(`${this.ENDPOINT}`, pagination);
	}

	static async getVenue(id: string): Promise<Venue> {
		return BaseService.fetch<Venue>(`${this.ENDPOINT}/${id}`);
	}
}