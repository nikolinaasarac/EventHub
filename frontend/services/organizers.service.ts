import BaseService from "@/services/base.service";
import {FormikValues} from "formik";

export class OrganizersService {
	static readonly ENDPOINT = "/organizers";

	static async createOrganizer(payload: FormikValues) {
		return BaseService.create(`${this.ENDPOINT}`, payload)
	}
}