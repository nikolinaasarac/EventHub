import {Venue} from "@/models/venue.model";
import BaseService from "@/services/base.service";
import {PaginatedResponse} from "@/models/paginated.model";
import {QueryParams} from "@/models/query-params.model";

export default class VenueService {
	static readonly ENDPOINT = "/venues"

	static async getVenues(queryParams: QueryParams): Promise<PaginatedResponse<Venue>> {
		return BaseService.fetchList(`${this.ENDPOINT}`, queryParams);
	}

	static async getVenue(id: string): Promise<Venue> {
		return BaseService.fetch<Venue>(`${this.ENDPOINT}/${id}`);
	}
}