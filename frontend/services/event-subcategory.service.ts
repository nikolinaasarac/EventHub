import BaseService from "@/services/base.service";
import {EventSubcategory} from "@/models/event-subcategory.model";

export default class EventSubcategoryService {
	static readonly ENDPOINT = "/event-subcategories"

	static async getEventSubcategories() {
		return BaseService.fetchList<EventSubcategory[]>(`${this.ENDPOINT}`);
	}
}