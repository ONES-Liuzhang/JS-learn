import axios from "axios";

let baseConfig = {
	baseURL: "http://localhost:9999",
	timeout: 1000,
};

export const request = createBaseInstance();

function createBaseInstance() {
	let instance = axios.create(baseConfig);
	instance.interceptors.response.use(handleResponse, handleError);
}

function handleResponse(response) {
	return response.data;
}

function handleError(error) {
	console.error("出错啦~", error);
}
