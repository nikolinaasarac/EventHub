import ApiClient from "@/services/api/api-client";

export default class BaseService {
	static async fetch<T>(endpoint: string, config = {}): Promise<T> {
		return ApiClient.get(endpoint, config).then((response) => response.data);
	}

	static async fetchList<T>(endpoint: string, config = {}): Promise<T> {
		return ApiClient.get(endpoint, config).then((response) => response.data);
	}
}