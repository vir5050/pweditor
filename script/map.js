/* SPDX-License-Identifier: MIT
 * Copyright(c) 2019-2020 Darek Stojaczyk for pwmirage.com
 */

class PWMap {
	constructor() {
		this.shadow = null;
		this.bg = null;
		this.pos_label = null;
		this.map_bounds = null;
		/* size of the actual image (unscaled) */
		this.bg_img_realsize = {
			w: 0,
			h: 0,
		};
		/* map drag position / scroll */
		this.pos = { scale: 1, offset: { x: 0, y: 0} };

		this.drag = {
			origin: {
				x: 0,
				y: 0
			},
			is_drag: false,
		};

		this.marker_img = {};
		this.hovered_spawner = null;
		this.hover_lbl = null
	}

	static async add_elements(parent) {
		const shadow_el = document.createElement('div');
		shadow_el.id = 'pw-map';
		shadow_el.style.position = 'absolute';
		shadow_el.style.width = '100vw';
		shadow_el.style.height = '100vh';
		shadow_el.style.overflow = 'hidden';
		const shadow = shadow_el.attachShadow({mode: 'open'});
		const tpl = await get(ROOT_URL + 'tpl/editor.tpl');
		const els = newArrElements(tpl.data);
		shadow.append(...els);
		parent.prepend(shadow_el);
		Window.set_container(shadow.querySelector('#pw-windows'));
		await db.load_map('world');
	}

	reinit(mapname) {
		return new Promise((resolve, reject) => {
			this.shadow = document.querySelector('#pw-map').shadowRoot;
			const canvas = this.canvas = this.shadow.querySelector('#pw-map-canvas');
			this.bg = canvas.querySelector('.bg');
			this.pw_map = canvas.querySelector('#pw-map');
			this.hover_lbl = this.shadow.querySelector('.label');
			canvas.style.display = 'block';
			this.bg.onload = async () => {
				this.pos_label = this.shadow.querySelector('#pw-map-pos-label');
				this.map_bounds = canvas.getBoundingClientRect();

				this.bg_img_realsize.w = this.bg.width;
				this.bg_img_realsize.h = this.bg.height;

				canvas.onmousedown = (e) => this.onmousedown(e);
				canvas.onwheel = (e) => this.onwheel(e);
				this.onmousemove_fn = (e) => this.onmousemove(e);
				this.onmouseup_fn = (e) => this.onmouseup(e);

				window.addEventListener('mousemove', this.onmousemove_fn, { passive: false });
				window.addEventListener('mouseup', this.onmouseup_fn, { passive: false });

				document.querySelector('#returnToWebsite').onclick = async () => {
					const minimized = document.body.classList.toggle('mge-background');
					document.querySelector('#returnToWebsite > a').dataset.tooltip =
						minimized ? 'Open the editor' : 'Return to website';
					//await Window.close_all();
					//await this.close();
				};

				this.resize_fn = () => this.redraw_dyn_overlay();
				await this.resize_fn();
				window.addEventListener('resize', this.resize_fn);

				//Window.open('welcome');
				await Window.open('LegendWindow', 'map_legend');
				resolve();
			};
			this.bg.onerror = reject;
			this.bg.src = ROOT_URL + 'data/images/map/' + mapname + '.jpg';
		});
	}

	close() {
		const pw_map = this.shadow.querySelector('#pw-map-canvas');
		window.removeEventListener('mousemove', this.onmousemove_fn);
		window.removeEventListener('mouseup', this.onmouseup_fn);
		window.removeEventListener('resize', this.resize_fn);
		pw_map.style.display = 'none';
		document.body.classList.remove('mge-fullscreen');
	}

	onmousedown(e) {
		e.preventDefault();

		this.drag.origin.x = e.clientX;
		this.drag.origin.y = e.clientY;
		this.drag.is_drag = true;
	}

	onmousemove(e) {
		e.preventDefault();

		if (this.drag.is_drag) {
			const new_offset = {
				x: this.pos.offset.x + (this.drag.origin.x - e.clientX),
				y: this.pos.offset.y + (this.drag.origin.y - e.clientY)
			};
			this.move_to(new_offset);
			if (!this.dyn_overlay_timeout) {
				this.dyn_overlay_timeout = setTimeout(() => this.redraw_dyn_overlay(), 300);
			}

			this.drag.origin.x = e.clientX;
			this.drag.origin.y = e.clientY;
		}

		if (this.canvas.querySelector(':hover')) {
			const map_coords = this.mouse_coords_to_map(e.clientX, e.clientY);
			map_coords.x = map_coords.x * 2 - this.bg_img_realsize.w;
			map_coords.y = - map_coords.y * 2 + this.bg_img_realsize.h;
			const spawner = this.get_marker_at(map_coords);

			this.hovered_spawner = spawner;
			this.hover_lbl.style.display = spawner ? 'block' : 'none';
			if (spawner) {
				const type = spawner.groups[0]?.type;
				let obj;
				if (spawner._db.type == 'spawners_world') {
					obj = db.npcs[type] || db.monsters[type];
				} else {
					obj = db.mines[type];
				}
				const name = obj?.name;

				this.hover_lbl.style.left = (e.clientX - this.map_bounds.left + 20) + 'px';
				this.hover_lbl.style.top = (e.clientY - this.map_bounds.top - 10) + 'px';
				this.hover_lbl.textContent = name;
			}

			document.body.style.cursor = spawner ? 'pointer' : '';
			this.shadow.querySelector('#pw-map-pos-label').textContent = 'X: ' + parseInt(map_coords.x) + ', Y: ' + parseInt(map_coords.y);
		} else {
			if (this.hovered_spawner) {
				this.hover_lbl.style.display = 'none';
				this.hovered_spawner = null;
				document.body.style.cursor = '';
			}
		}

		Window.onmousemove(e);
	}

	onmouseup(e) {
		if (this.drag.is_drag) {
			this.redraw_dyn_overlay();
		}
		this.drag.is_drag = false;
		const marker = this.get_hovered_marker(e);
		if (marker) {
			const type = marker.groups[0]?.type;
			let obj;
			if (marker._db.type == 'spawners_world') {
				obj = db.npcs[type] || db.monsters[type];
			}
			if (obj) console.log(marker, obj);
		}
		Window.onmouseup(e);
	}

	onwheel(e) {
		const delta = -Math.sign(e.deltaX + e.deltaY + e.deltaZ) / 10.0;
		this.zoom(delta, { x: e.clientX, y: e.clientY });
		e.preventDefault();
	}

	getmarkersize() {
		return Math.min(28, 16 * Math.sqrt(this.pos.scale));
	}

	get_hovered_marker(e) {
		const map_coords = this.mouse_coords_to_map(e.clientX, e.clientY);
		map_coords.x = map_coords.x * 2 - this.bg_img_realsize.w;
		map_coords.y = - map_coords.y * 2 + this.bg_img_realsize.h;

		return this.get_marker_at(map_coords);
	}

	get_marker_at(map_coords) {
		const marker_size = this.getmarkersize() * 1.4 / this.pos.scale;

		for (const type in this.drawn_spawners) {
			for (const spawner of this.drawn_spawners[type]) {
				const x = spawner.pos[0];
				const y = spawner.pos[2];

				if (map_coords.x >= x - marker_size / 2 &&
				    map_coords.y < y + marker_size / 2 &&
				    map_coords.x < x + marker_size / 2 &&
				    map_coords.y >= y - marker_size / 2) {
					return spawner;
				}
			}
		}

		return null;
	}

	async redraw_dyn_overlay() {
		if (this.redrawing_dyn_overlay++) {
			return;
		}
		this.redrawing_dyn_overlay = 1;

		const overlay = this.shadow.querySelector('.dyn-canvas:not(.shown)');
		if (overlay.width != 3 * this.canvas.offsetWidth ||
			overlay.height != 3 * this.canvas.offsetHeight) {
			overlay.width = this.canvas.offsetWidth * 3;
			overlay.height = this.canvas.offsetHeight * 3;
			overlay.style.left = -this.canvas.offsetWidth + 'px';
			overlay.style.top = -this.canvas.offsetHeight + 'px';
			overlay.style.width = overlay.width + 'px';
			overlay.style.height = overlay.height + 'px';
		}

		const pos = overlay.last_rendered_pos = { offset: {
			x: this.pos.offset.x,
			y: this.pos.offset.y
		}, scale: this.pos.scale };

		const drawn_spawners = { npc: [], mob: [], resource: [] };
		for (const list of [db.spawners_world, db.resources_world]) {
			for (const spawner of list) {
				const x = (0.5 * 4096 + spawner.pos[0] / 2) * pos.scale;
				const y = (0.5 * 5632 - spawner.pos[2] / 2) * pos.scale;

				if (x > pos.offset.x - overlay.width / 3&& x <= pos.offset.x + overlay.width * 2 / 3 &&
					y > pos.offset.y -  overlay.height / 3 && y <= pos.offset.y + overlay.height * 2 / 3) {
					if (list == db.resources_world) {
						if (!this.marker_filters|| this.marker_filters.resource(spawner)) {
							drawn_spawners.resource.push(spawner);
						}
					} else if (spawner.is_npc) {
						if (!this.marker_filters || this.marker_filters.npc(spawner)) {
							drawn_spawners.npc.push(spawner);
						}
					} else {
						if (!this.marker_filters || this.marker_filters.mob(spawner)) {
							drawn_spawners.mob.push(spawner);
						}
					}
				}
			}
		}

		const ctx = overlay.getContext("2d");
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, overlay.width, overlay.height);

		overlay.style.transformOrigin = (-pos.offset.x + overlay.width/3) + 'px ' + (-pos.offset.y + overlay.height/3) + 'px';
		this.move_dyn_overlay();

		ctx.translate(-pos.offset.x + overlay.width/3, -pos.offset.y + overlay.height/3);
		const size = this.getmarkersize();

		const get_spawner_icon = (type) => {
			if (this.marker_img[type]) return this.marker_img[type];

			const img = new Image();
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					this.marker_img[type] = img; resolve(img);
				};
				img.onerror = reject;
				if (type.startsWith('data:')) {
					img.src = type;
				} else {
					img.src = ROOT_URL + 'img/marker-' + type + '.png';
				}
			});
		};

		const drawAt = (img, rad, x, y, width, height) => {
			ctx.translate(x, y);
			ctx.rotate(rad);
			ctx.drawImage(img, -width / 2, -height / 2, width, height);
			ctx.rotate(-rad);
			ctx.translate(-x, -y);
		}

		let i;
		for (const list in drawn_spawners) {
			let marker_img;
			if (list == 'mob') {
				marker_img = await get_spawner_icon('red');
			} else if (list == 'npc') {
				marker_img = await get_spawner_icon('yellow');
			} else if (list == 'resource') {
				marker_img = await get_spawner_icon('green');
			}

			const spawner_list = drawn_spawners[list];
			const foreach_spawner = async (fn) => {
				for (i = 0; i < spawner_list.length; i += 500) {
					await new Promise((resolve) => setTimeout(async () => {
						let j;
						for (j = 0; j < 500; j++) {
							if (i + j >= spawner_list.length) break;
							const spawner = spawner_list[i + j];
							if (!spawner) continue;

							fn(spawner);
						}
						resolve();
					}, 1));
				}
			}

			if (this.marker_filters?.show_labels) {
				await foreach_spawner((spawner) => {
					const x = (0.5 * 4096 + spawner.pos[0] / 2) * pos.scale;
					const y = (0.5 * 5632 - spawner.pos[2] / 2) * pos.scale;

					let marker_name;
					const type = spawner.groups[0]?.type || 0;
					if (list == 'mob') {
						const mob = db.monsters[type];
						marker_name = mob?.name;
					} else if (list == 'npc') {
						const npc = db.npcs[type];
						marker_name = npc?.name;
					} else {
						const res = db.mines[type];
						marker_name = res?.name;
					}
					marker_name = (marker_name ?? "(unnamed)") || "(unnamed)";
					const w = ctx.measureText(marker_name).width;

					ctx.fillStyle = 'black';
					ctx.fillRect(x + size / 2 + 8, y - 11, w + 14, 22);
					ctx.font = '12px Arial';
					ctx.fillStyle = 'white';
					ctx.fillText(marker_name, x + size / 2 + 14, y + 5);
				});
			}

			await foreach_spawner((spawner) => {
				const x = (0.5 * 4096 + spawner.pos[0] / 2) * pos.scale;
				const y = (0.5 * 5632 - spawner.pos[2] / 2) * pos.scale;
				const rad = -Math.atan2(spawner.dir[2], spawner.dir[0]) + Math.PI / 2;
				drawAt(marker_img, rad, x, y, size, size);
			});
		}

		this.move_dyn_overlay();

		let rescaled = pos.scale != overlay.last_rendered_pos.scale;
		const prev_overlay = this.shadow.querySelector('.dyn-canvas.shown');
		prev_overlay.classList.remove('shown');
		overlay.classList.add('shown');
		this.drawn_spawners = drawn_spawners;

		const fn = () => {
			clearTimeout(this.dyn_overlay_timeout);
			this.dyn_overlay_timeout = null;
			this.redrawing_dyn_overlay = 0;
			if (this.pos.offset.x != pos.offset.x ||
					this.pos.offset.y != pos.offset.y ||
					this.pos.scale != pos.scale) {
				this.redraw_dyn_overlay();
			}
		};

		if (rescaled) {
			/* let the transition animation finish first */
			this.dyn_overlay_timeout = setTimeout(fn, 300);
		} else {
			/* redraw moves immediately */
			this.dyn_overlay_timeout = setTimeout(fn, 300);
		}
	}

	filter_markers(filters) {
		this.marker_filters = filters;
		this.redraw_dyn_overlay();
	}

	move_dyn_overlay() {
		const overlays = this.shadow.querySelectorAll('.dyn-canvas');
		for (const overlay of overlays) {
			const last_pos = overlay.last_rendered_pos || this.pos;
			const x = this.pos.offset.x - last_pos.offset.x;
			const y = this.pos.offset.y - last_pos.offset.y;
			const scale = this.pos.scale / last_pos.scale;

			overlay.style.transform = 'translate(' + (-x) + 'px,' + (-y) + 'px) scale(' + scale + ')';
		}
	}

	move_to(new_offset) {
		this.pos.offset = new_offset;
		this.pw_map.style.transform = 'translate(' + (-this.pos.offset.x) + 'px,' + (-this.pos.offset.y) + 'px) scale(' + this.pos.scale + ')';

		this.move_dyn_overlay();
	}

	zoom(delta, origin) {
		const old_scale = this.pos.scale;
		this.pos.scale = Math.max(0.100, this.pos.scale * (1 + delta));
		const new_pos = {
			x: this.pos.offset.x + ((this.pos.offset.x + origin.x) / old_scale
				      - (this.pos.offset.x + origin.x) / this.pos.scale) * this.pos.scale,
			y: this.pos.offset.y + ((this.pos.offset.y + origin.y) / old_scale
				      - (this.pos.offset.y + origin.y) / this.pos.scale) * this.pos.scale,
		};
		this.move_to(new_pos);
		if (!this.dyn_overlay_timeout) {
			this.dyn_overlay_timeout = setTimeout(() => this.redraw_dyn_overlay(), 300);
		}
	}

	mouse_coords_to_map(mousex, mousey) {
		return {
			x: (mousex - this.map_bounds.left + this.pos.offset.x) / this.pos.scale,
			y: (mousey - this.map_bounds.top + this.pos.offset.y) / this.pos.scale
		};
	}

};
