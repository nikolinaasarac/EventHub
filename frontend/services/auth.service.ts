import BaseService from "@/services/base.service";
import {User} from "@/models/user.model";

export default class AuthService {
	static readonly ENDPOINT = "/auth"

	static async login() {
		return BaseService.fetch<User>(`${this.ENDPOINT}/login`);
	}

	static async getCurrentUser() {
		return BaseService.fetch<User>(`${this.ENDPOINT}/me`);
	}
}