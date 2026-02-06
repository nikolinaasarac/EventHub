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

	static async getAllVenues(): Promise<Venue[]> {
		return BaseService.fetchList<Venue[]>(`${this.ENDPOINT}/get-all`);
	}

	static async getVenue(id: string): Promise<Venue> {
		return BaseService.fetch<Venue>(`${this.ENDPOINT}/${id}`);
	}

	static async createVenue(formData: FormData) {
		return BaseService.create(`${this.ENDPOINT}`, formData);
	}

	static async updateVenue(id: number, formData: FormData){
		return BaseService.update(`${this.ENDPOINT}/${id}`, formData);
	}

	static async deleteVenue(id: string) {
		return BaseService.delete(`${this.ENDPOINT}/${id}`);
	}
}