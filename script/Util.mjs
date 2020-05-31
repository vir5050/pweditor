/* SPDX-License-Identifier: MIT
 * Copyright(c) 2019-2020 Darek Stojaczyk for pwmirage.com
 */

export const get = async (url, { is_json } = {}) => {
	const resp = await fetch(url, { method: 'GET', headers: {} });
	if (!resp.ok) {
		resp.data = {};
		return resp;
	}

	const data_txt = await resp.text();
	resp.data = data_txt;

	if (is_json) {
		try {
			resp.data = JSON.parse(data_txt);
			return resp;
		} catch (e) {
			console.error(e);
			console.error(data_txt);
			resp.data = {};
		}
	}
	return resp;
}

export const sleep = (msec) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), msec);
	});
}

export const ROOT_URL = '/map/';
