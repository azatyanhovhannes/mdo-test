import Vue from "vue";
import axios from "axios";

const http = axios.create({
	baseURL: " https://dev.moydomonline.ru/api",
});

http.interceptors.request.use(config => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});


http.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

Vue.prototype.$http = http;

declare module "vue/types/vue" {
	interface Vue {
		$http: typeof http;
	}
}
