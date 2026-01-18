import {Venue} from "@/models/venue.model";
import BaseService from "@/services/base.service";

export default class VenueService {
	static readonly ENDPOINT = "/venues"

	static async getVenues(): Promise<Venue[]> {
		return BaseService.fetchList<Venue[]>(`${this.ENDPOINT}`);
	}

	static async getVenue(id: string): Promise<Venue> {
		return BaseService.fetch<Venue>(`${this.ENDPOINT}/${id}`);
	}
}