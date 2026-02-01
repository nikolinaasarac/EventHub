import axios from "axios";
import {authToken} from "@/services/api/auth.token";
import UserService from "@/services/user.service";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
	headers: {
		accept: "application/json",
	},
});

axiosInstance.interceptors.request.use((config) => {
	const token = authToken.get();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve(token);
	});
	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(res) => res,
	async (error) => {
		const originalRequest = error.config;

		const isAuthEndpoint =
			originalRequest.url?.includes("/auth/login") ||
			originalRequest.url?.includes("/auth/logout") ||
			originalRequest.url?.includes("/auth/refresh-token");

		if (isAuthEndpoint) {
			return Promise.reject(error);
		}

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({resolve, reject});
				}).then((token) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return axiosInstance(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const res = await UserService.refreshToken();

				const newAccessToken = res.accessToken;
				authToken.set(newAccessToken);

				processQueue(null, newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				processQueue(err, null);
				authToken.clear();
				window.location.href = "/login";
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;