/* SPDX-License-Identifier: MIT
 * Copyright(c) 2019-2020 Darek Stojaczyk for pwmirage.com
 */

const db = new DB();
let g_db_cache;
let g_db_promise;

const g_db_meta = {
	id: 0,
	tag: "version",
	base: 0,
	edit_time: 0,
	project: {},
};

const pwdb_register_data_type = async (type, url) => {
	let resolve = null;

	if (g_db_promise) {
		await g_db_promise;
	} else {
		g_db_promise = new Promise((r) => { resolve = r; });
	}

	let cached = await new Promise((resolve, reject) => {
		if (g_db_cache) return resolve(true);
		if (!window.indexedDB) return resolve(false);

		const request = window.indexedDB.open("db-cache", 1);
		request.onerror = reject;
		let cached = true;

		request.onsuccess = () => {
			g_db_cache = request.result;
			resolve(cached);
		};

		request.onupgradeneeded = (event) => {
			cached = false;
			let db = event.target.result;
			db.createObjectStore('tables', { keyPath: 'type' });
		}
	});

	if (cached) {
		await new Promise((resolve, reject) => {
			const cache = g_db_cache.transaction(['tables'], 'readonly').objectStore('tables');
			const request = cache.get(type);
			request.onerror = reject;
			request.onsuccess = () => {
				const cache = request.result;
				if (cache) {
					g_db[type] = cache.arr;
				} else {
					cached = false;
				}
				resolve();
			};
		});
	}

	if (!cached) {
		if (!url) {
			url = ROOT_URL + 'data/base/' + type + '.json';
		}
		url += '?v=' + MG_VERSION;
		console.log('fetching ' + url);
		g_db[type] = (await get(url, { is_json: 1, headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}})).data;
		const cache = g_db_cache.transaction(['tables'], 'readwrite').objectStore('tables');
		cache.add({ type, arr: g_db[type] });
	}
	db.register_type(type, g_db[type]);

	if (resolve) resolve();
}

const g_pwdb_init_promise = Promise.all([
	db.register_type('metadata', [g_db_meta]),
	pwdb_register_data_type('items'),
	pwdb_register_data_type('mines'),
	pwdb_register_data_type('recipes'),
	pwdb_register_data_type('npc_sells'),
	pwdb_register_data_type('npc_crafts'),
	pwdb_register_data_type('npcs'),
	pwdb_register_data_type('monsters'),
]);
//pwdb_register_data_type('quests');

db.load_map = async (name) => {
	await Promise.all([
		pwdb_register_data_type('spawners_world', ROOT_URL + 'data/base/map/' + name + '/spawners.json'),
		pwdb_register_data_type('resources_world', ROOT_URL + 'data/base/map/' + name + '/resources.json'),
		g_pwdb_init_promise
	]);

	db.register_type('resources', g_db.resources);
}