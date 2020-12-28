/* SPDX-License-Identifier: MIT
 * Copyright(c) 2019-2020 Darek Stojaczyk for pwmirage.com
 */

const g_db = {};

const ROOT_URL = '/editor/';
let MG_VERSION_FULL = {};
let MG_VERSION = '0';

let PROJECT_NAME = ''
let PROJECT_REVISION = 0;
let PROJECT_LAST_EDIT = 0;

/* needs to be in / to fetch requests from origin /, .htaccess to the rescue */
navigator.serviceWorker.register('/service-worker.js');

const mg_init = async () => {
	/* check authentication first */
	await Promise.all([
		fetch(ROOT_URL + 'version.php', { is_json: 1 }).then(async (r) => {
			MG_VERSION_FULL = await r.json();
			MG_VERSION = MG_VERSION_FULL.mtime;
		}),
	]);

	await load_script(ROOT_URL + 'script/util.js?v=' + MG_VERSION)
	await load_script(ROOT_URL + 'script/loading.js?v=' + MG_VERSION),
	await load_script(ROOT_URL + 'script/maintainer.js?v=' + MG_VERSION),
	await load_script(ROOT_URL + 'script/preview.js?v=' + MG_VERSION),

	await PWPreview.load_promise;
};

const load_script = (src) => {
	return new Promise((resolve, reject) => {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.onload = resolve;
		script.onerror = reject;
		script.charset = "utf-8";
		script.src = src;
		document.head.appendChild(script);
	});
}

let g_last_body_el = null;
const load_tpl = async (src) => {
	const file = await get(src);
	if (!file.ok) {
		throw new Error('Failed to load template: ' + src);
	}

	if (!g_last_body_el) {
		g_last_body_el = document.body.lastElementChild;
	}
	g_last_body_el.insertAdjacentHTML('afterend', file.data);
}

let g_mg_editor_open = false;
const mg_open_editor = async (args) => {
	if (g_mg_editor_open) return;
	g_mg_editor_open = true;

	try {
		PROJECT_NAME = args.name;
		PROJECT_LAST_EDIT = args.last_edit;
		await g_mg_loaded;
		await Loading.show_curtain();

		document.body.classList.add('mge-fullscreen');
		await load_script(ROOT_URL + 'script/editor.js?v=' + MG_VERSION);
		await Editor.open(args);
		Loading.hide_curtain();
	} finally {
		g_mg_editor_open = false;
	}
}

const notify = (type, msg) => {
	return new Promise(resolve => {
		require(["Ui/Notification"], function(UiNotification) {
			UiNotification.show(msg, () => {
				resolve();
			}, type);
		});
	});
}

const confirm = (msg) => {
	return new Promise(resolve => {
		require(["Ui/Confirmation"], function(UiConfirmation) {
			UiConfirmation.show({
				confirm: () => { resolve(true); },
				cancel: () => { resolve(false);	},
				messageIsHtml: true,
				message: msg,
			});
		});
	});
}

const g_mg_loaded = mg_init();
