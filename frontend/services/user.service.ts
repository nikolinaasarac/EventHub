import BaseService from "@/services/base.service";
import {LoginResponse, User} from "@/models/user.model";
import {UserParams} from "@/models/user-params.model";
import {PaginatedResponse} from "@/models/paginated.model";
import {Event} from "@/models/event.model";
import {QueryParams} from "@/models/query-params.model";

export default class UserService {
	static readonly ENDPOINT = "/auth"

	static async login(email: string, password: string) {
		return BaseService.create<LoginResponse>(`${this.ENDPOINT}/login`, {email, password});
	}

	static async getCurrentUser() {
		return BaseService.fetch<User>(`${this.ENDPOINT}/me`);
	}

	static async refreshToken(): Promise<{ accessToken: string, id: string }> {
		return BaseService.create(`${this.ENDPOINT}/refresh-token`);
	}

	static async logout() {
		return BaseService.create(`${this.ENDPOINT}/logout`);
	}

	static async register(email: string, password: string): Promise<LoginResponse> {
		return BaseService.create(`${this.ENDPOINT}/register`, {email, password});
	}

	static async getUsers(params: QueryParams): Promise<PaginatedResponse<User>> {
		return BaseService.fetchList(`/users`, params);
	}

	static async toggleStatus(id: string) {
		return BaseService.update(`/users/${id}/toggle-status`, {});
	}

	static async setPassword(token: string, password: string) {
		return BaseService.create(`${this.ENDPOINT}/set-password?token=${token}`, {password});
	}
}