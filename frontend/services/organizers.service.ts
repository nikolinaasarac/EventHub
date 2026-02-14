import BaseService from "@/services/base.service";
import {CreateOrganizerDto} from "@/models/dto/create-organizer.dto";

export class OrganizersService {
	static readonly ENDPOINT = "/organizers";

	static async createOrganizer(payload: CreateOrganizerDto) {
		return BaseService.create(`${this.ENDPOINT}`, payload)
	}
}