import {Venue} from "@/models/venue.model";
import BaseService from "@/services/base.service";
import {PaginatedResponse} from "@/models/paginated.model";
import {QueryParams} from "@/models/query-params.model";
import {CreateVenueDto} from "@/models/dto/create-venue.dto";

export default class VenueService {
	static readonly ENDPOINT = "/venues"

	static async getVenues(queryParams: QueryParams): Promise<PaginatedResponse<Venue>> {
		return BaseService.fetchList(`${this.ENDPOINT}`, queryParams);
	}

	static async getVenue(id: string): Promise<Venue> {
		return BaseService.fetch<Venue>(`${this.ENDPOINT}/${id}`);
	}

	static async createVenue(venue: CreateVenueDto) {
		return BaseService.create(`${this.ENDPOINT}`, venue);
	}
}