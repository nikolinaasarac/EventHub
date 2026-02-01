import BaseService from "@/services/base.service";
import {LoginResponse, User} from "@/models/user.model";

export default class UserService {
	static readonly ENDPOINT = "/auth"

	static async login(email: string, password: string) {
		return BaseService.create<LoginResponse>(`${this.ENDPOINT}/login`, {email, password});
	}

	static async getCurrentUser() {
		return BaseService.fetch<User>(`${this.ENDPOINT}/me`);
	}

	static async refreshToken():Promise<{accessToken: string, id: string}> {
		return BaseService.create(`${this.ENDPOINT}/refresh-token`);
	}

	static async logout() {
		return BaseService.create(`${this.ENDPOINT}/logout`);
	}
}