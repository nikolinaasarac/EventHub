import ApiClient from "@/services/api/api-client";

export default class BaseService {
	static async fetch<T>(endpoint: string, config = {}): Promise<T> {
		return ApiClient.get(endpoint, config).then((response) => response.data);
	}

	static async fetchList<T>(endpoint: string, config = {}): Promise<T> {
		return ApiClient.get(endpoint, config).then((response) => response.data);
	}

	static async create<T>(endpoint: string, body: any, config = {}): Promise<T> {
		return ApiClient.post(endpoint, body, config).then((response) => response.data);
	}

	static async update<T>(endpoint: string, body: any, config = {}): Promise<T> {
		return ApiClient.patch(endpoint, body, config).then((response) => response.data);
	}
}