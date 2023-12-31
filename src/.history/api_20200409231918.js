import axios from "axios";
const fs = require('fs');

const callApi = async (method, path, data, jwt, params = {}) => {
	const headers = {
		Authorization: `Bearer ${jwt}`,
		"Content-Type": "application/json",
	};
	const baseUrl = "http://127.0.0.1:8000/api/v1";
	const fullUrl = `${baseUrl}${path}`;
	if (method === "get" || method === "delete") {
		return axios[method](fullUrl, { headers, params });
	} else {
		return axios[method](fullUrl, data, { headers });
	}
};
//callApi("post", "/users/", form("users.json"))
export default {
	createAccount: (form) => fs.writeFileSync('./users/users.json'),
	login: (form) => callApi("post", "/users/login/", form),
	rooms: (page = 1, token) =>
		callApi("get", `/rooms/?page=${page}`, null, token),
	favs: (id, token) => callApi("get", `/users/${id}/favs/`, null, token),
	toggleFavs: (userId, roomId, token) =>
		callApi("put", `/users/${userId}/favs/`, { pk: roomId }, token),
	search: (form, token) => callApi("get", "/rooms/search/", null, token, form),
};
