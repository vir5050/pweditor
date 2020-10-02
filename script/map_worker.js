const g_canvases = [];
let g_canvas_id = 0;

let g_map = null;
let g_opts = null;
let g_spawners = null;
let g_resources = null;
let g_pos = null;
let g_marker_size = 0;
let g_window_size = { width: 1, height: 1 };

/* both spawners and resources */
let g_drawn_spawners = null;
const g_icons = {};

// Waiting to receive the OffScreenCanvas
self.onmessage = async (e) => {
	const type = e.data.type;
	const resp = { msg_id: e.data.msg_id, type: e.data.type };

	switch (type) {
		case 'set_canvas': {
			const id = e.data.id;
			const canvas = e.data.canvas;
			g_canvases[id] = canvas;
			break;
		}
		case 'mouse': {
			const x = e.data.x;
			const y = e.data.y;
			resp.hovered_spawner = get_spawner_at(x, y);
			break;
		}
		case 'set_map': {
			const map = e.data.map;
			const spawners = e.data.spawners;
			const resources = e.data.resources;
			g_map = map;
			g_spawners = spawners;
			g_resources = resources;
			break;
		}
		case 'set_options': {
			const opts = e.data.opts;
			g_opts = opts;
			break;
		}
		case 'resize': {
			const vw = e.data.width;
			const vh = e.data.height;
			for (const canvas of g_canvases) {
				canvas.width = vw * 3;
				canvas.height = vh * 3;
			}
			break;
		}
		case 'redraw': {
			const pos = e.data.pos;
			const marker_size = e.data.marker_size;
			g_window_size.width = e.data.width;
			g_window_size.height = e.data.height;
			g_pos = pos;
			g_marker_size = marker_size;
			await redraw();
			break;
		}
	}

	self.postMessage(resp);
};

const get_spawner_at = (mx, my) => {
	if (!g_drawn_spawners) {
		return null;
	}

	for (const type in g_drawn_spawners) {
		for (const spawner of g_drawn_spawners[type]) {
			const x = spawner.pos[0];
			const y = spawner.pos[2];

			if (mx >= x - g_marker_size / 2 &&
			    my < y + g_marker_size / 2 &&
			    mx < x + g_marker_size / 2 &&
			    my >= y - g_marker_size / 2) {
				return spawner;
			}
		}
	}

	return null;
}

const get_icon = (type) => {
	if (g_icons[type]) return g_icons[type];

	return (async () => {
		const imgblob = await fetch('/editor/img/marker-' + type + '.png').then(r => r.blob());
		const img = await createImageBitmap(imgblob);
		return img;
	})();
};

const filter_spawners = (canvas) => {
	const drawn_spawners = { npc: [], mob: [], resource: [] };
	for (const list of [g_spawners, g_resources]) {
		for (const spawner of list) {
			let { x, y } = spawner_coords_to_map(spawner.pos[0], spawner.pos[2]);
			x *= g_pos.scale;
			y *= g_pos.scale;

			if (x <= g_pos.offset.x - canvas.width / 3 || x > g_pos.offset.x + canvas.width * 2 / 3 ||
					y <= g_pos.offset.y - canvas.height / 3 || y > g_pos.offset.y + canvas.height * 2 / 3) {
				continue;
			}

			if (g_opts.name_filter &&
					!spawner._db.shown_name.toLowerCase().includes(g_opts.name_filter)) {
				continue;
			}

			if (spawner._db.type.startsWith('resources_')) {
				drawn_spawners.resource.push(spawner);
			} else if (spawner.is_npc) {
				drawn_spawners.npc.push(spawner);
			} else {
				drawn_spawners.mob.push(spawner);
			}
		}
	}

	g_drawn_spawners = drawn_spawners;
}

const spawner_coords_to_map = (x, y) => {
	return {
		x: (0.5 * g_map.size.x + x / 2) * g_map.bg_scale + 0,
		y: (0.5 * g_map.size.y - y / 2) * g_map.bg_scale - 0
	};
}

const redraw = async () => {
	const t0 = performance.now();

	const pos = g_pos;
	const canvas_idx = (++g_canvas_id) % g_canvases.length;
	const canvas = g_canvases[canvas_idx];
	const ctx = canvas.getContext('2d');

	filter_spawners(canvas);

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.translate(-pos.offset.x + canvas.width/3, -pos.offset.y + canvas.height/3);

	const drawAt = (img, rad, x, y, width, height) => {
		ctx.translate(x, y);
		ctx.rotate(rad);
		ctx.drawImage(img, -width / 2, -height / 2, width, height);
		ctx.rotate(-rad);
		ctx.translate(-x, -y);
	}

	let i;
	for (const list in g_drawn_spawners) {
		let marker_img;
		if (list == 'mob') {
			marker_img = await get_icon('red');
		} else if (list == 'npc') {
			marker_img = await get_icon('yellow');
		} else if (list == 'resource') {
			marker_img = await get_icon('green');
		}

		const spawner_list = g_drawn_spawners[list];

		if (g_opts.show_labels) {
			for (const spawner of spawner_list) {
				let { x, y } = spawner_coords_to_map(spawner.pos[0], spawner.pos[2]);
				x *= pos.scale;
				y *= pos.scale;

				if (!g_opts.focused_spawners?.size || g_opts.focused_spawners?.has(spawner)) {
					ctx.globalAlpha = 1.0;
				} else {
					ctx.globalAlpha = 0.3;
				}

				const w = ctx.measureText(marker_name).width;

				ctx.fillStyle = 'black';
				ctx.fillRect(x + g_marker_size / 2 + 8, y - 11, w + 14, 22);
				ctx.font = '12px Arial';
				ctx.fillStyle = 'white';
				ctx.fillText(spawner._db.shown_name, x + g_marker_size / 2 + 14, y + 5);
			}
		}

		for (const spawner of spawner_list) {
			let { x, y } = spawner_coords_to_map(spawner.pos[0], spawner.pos[2]);
			x *= pos.scale;
			y *= pos.scale;
			const rad = -Math.atan2(spawner.dir[2], spawner.dir[0]) + Math.PI / 2;
			if (!g_opts.focused_spawners?.size || g_opts.focused_spawners?.has(spawner)) {
				ctx.globalAlpha = 1.0;
			} else {
				ctx.globalAlpha = 0.3;
			}
			drawAt(marker_img, rad, x, y, g_marker_size, g_marker_size);
		}
	}

	const t1 = performance.now();
	console.log('canvas rendering took: ' + (t1 - t0) + 'ms');
};