import BaseService from "@/services/base.service";
import {User} from "@/models/user.model";

export default class UserService {
	static readonly ENDPOINT = "/auth"

	static async login(email: string, password: string) {
		return BaseService.create<User>(`${this.ENDPOINT}/login`, {email, password});
	}

	static async getCurrentUser() {
		return BaseService.fetch<User>(`${this.ENDPOINT}/me`);
	}
}