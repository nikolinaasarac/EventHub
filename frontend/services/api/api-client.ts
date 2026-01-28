import {AxiosResponse} from "axios";
import axiosInstance from "@/services/api/axios-instance";

export default class ApiClient {
	static async get(endpoint: string, queryParams = {}, config = {}): Promise<AxiosResponse> {
		return axiosInstance.get(endpoint, {
			params: queryParams,
			...config,
		});
	}

	static async put(endpoint: string, body: any, queryParams = {}): Promise<AxiosResponse> {
		return axiosInstance.put(endpoint, body, {
			params: queryParams,
		});
	}

	static async patch(endpoint: string, body: any, queryParams = {}): Promise<AxiosResponse> {
		return axiosInstance.patch(endpoint, body, {
			params: queryParams,
		});
	}

	static async remove(endpoint: string, queryParams: any = {}): Promise<AxiosResponse> {
		return axiosInstance.delete(endpoint, {
			params: queryParams,
		});
	}

	static async post(endpoint: string, body: any, config = {}): Promise<AxiosResponse> {
		return axiosInstance.post(endpoint, body, config);
	}
}