import BaseService from "@/services/base.service";
import {EventCategory} from "@/models/event-category.model";

export default class EventCategoryService {
	static readonly ENDPOINT = "/event-categories"

	static async getEventCategories() {
		return BaseService.fetchList<EventCategory[]>(`${this.ENDPOINT}`);
	}
}