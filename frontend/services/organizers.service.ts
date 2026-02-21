import BaseService from "@/services/base.service";
import {FormikValues} from "formik";
import {OrganizerStatistics} from "@/models/organizer-statistics.model";

export class OrganizersService {
	static readonly ENDPOINT = "/organizers";

	static async createOrganizer(payload: FormikValues) {
		return BaseService.create(`${this.ENDPOINT}`, payload)
	}

	static async getMyStatistics(): Promise<OrganizerStatistics> {
		return BaseService.fetch<OrganizerStatistics>(`${this.ENDPOINT}/my-statistics`);
	}
}