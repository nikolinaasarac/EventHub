import BaseService from "@/services/base.service";
import {VenueType} from "@/models/venue-type.model";

export default class VenueTypesService {
	static readonly ENDPOINT = "/venue-types"

	static async getVenueTypes() {
		return BaseService.fetchList<VenueType[]>(`${this.ENDPOINT}`);
	}
}