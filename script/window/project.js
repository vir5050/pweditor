/* SPDX-License-Identifier: MIT
 * Copyright(c) 2019-2020 Darek Stojaczyk for pwmirage.com
 */

class CreateProjectWindow extends Window {
	static is_open = false;
	static tpl = load_tpl_once('window/project.tpl');
	async init() {
		const tpl_f = await this.constructor.tpl;
		if (CreateProjectWindow.is_open) {
			return;
		}
		CreateProjectWindow.is_open = true;
		this.tpl = new Template(tpl_f.id);
		this.tpl.compile_cb = (dom) => this.tpl_compile_cb(dom);

		const data = await this.tpl.run( { win: this, maps: PWMap.maps });
		this.shadow.append(data);

		await super.init();
		this.move((Window.bounds.right - Window.bounds.left - this.dom_win.offsetWidth) / 2,
				(Window.bounds.bottom - Window.bounds.top - this.dom_win.offsetHeight) / 2);
		return true;
	}

	close() {
		CreateProjectWindow.is_open = false;
		super.close();
	}

	oninput(name_el) {
		if (name_el.value.length) {
			this.shadow.querySelector('#submit').classList.remove('disabled');
		} else {
			this.shadow.querySelector('#submit').classList.add('disabled');
		}
	}

	async submit() {
		this.shadow.querySelector('#submit').classList.add('disabled');
		const name = this.shadow.querySelector('#name').value;
		let req = await post(ROOT_URL + 'api/project/new', { is_json: 1, data: { name } });
		if (!req.ok) {
			this.shadow.querySelector('#err').textContent = req.data.err || 'Unexpected error occured';
			if (this.err_fade_timeout) {
				clearTimeout(this.err_fade_timeout);
			}
			this.err_fade_timeout = setTimeout(() => {
				this.shadow.querySelector('#err').textContent = '';
			}, 8000);
			this.shadow.querySelector('#submit').classList.remove('disabled');
			return;
		}
		const new_project = req.data[0];

		if (this.shadow.querySelector('#transfer-changes').checked) {
			const cur_project = db.metadata[1];
			const data = db.dump_last(PWDB.last_saved_changeset, { spacing: 0 });
			localStorage.removeItem('pwdb_lchangeset_' + cur_project.pid);

			if (data != '[]') {
				const parsed_data = JSON.parse(data);
				const fix_ids = (obj) => {
					for (const f in obj) {
						const v = obj[f];

						/* 0, null, undefined, empty string... */
						if (!v) {
							continue;
						}

						if (typeof(v) == 'object') {
							fix_ids(v);
							continue;
						}
						if (typeof(v) == 'string') {
							continue;
						}

						if (v < 0x80000000 || v > 0x80000000 + 0x100000) {
							continue;
						}

						obj[f] += new_project.pid * 0x100000;
					}
				};
				fix_ids(parsed_data);

				const fixed_data = JSON.stringify(parsed_data);
				req = await post(ROOT_URL + 'api/project/' + new_project.pid + '/save', {
					is_json: 1, data: {
						file: new File([new Blob([fixed_data])], 'project.json', { type: 'application/json' }),
					}
				});
				if (!req.ok) {
					Loading.notify('error', 'Project created, but failed to transfer the changes: ' + (req.data.err || 'Unknown error'));
					const dump = db.dump_last(PWDB.last_saved_changeset, { spacing: 0 });
					localStorage.setItem('pwdb_lchangeset_' + project.pid, dump);
				}
			}
		}

		if (req.ok) {
			notify('success', 'Project created');
		}
		await sleep(2000);
		Window.close_all();
		await mg_open_editor({ pid: new_project.pid, name, last_edit: Math.floor(Date.now() / 1000) });
	}
}
