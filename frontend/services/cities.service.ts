import BaseService from "@/services/base.service";
import {City} from "@/models/city.model";

export default class CitiesService {
	static readonly ENDPOINT = "/cities"

	static async getCities() {
		return BaseService.fetchList<City[]>(`${this.ENDPOINT}`);
	}
}