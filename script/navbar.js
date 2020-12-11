/* SPDX-License-Identifier: MIT
 * Copyright(c) 2019-2020 Darek Stojaczyk for pwmirage.com
 */

let g_navbar = null;

class Navbar {
	constructor(org_menu_dom) {
		this.org_menu_dom = org_menu_dom;
		this.dom = newElement('<ol class="boxMenu overlayed"></ol>');

		this.org_menu_dom.parentNode.insertBefore(this.dom, this.org_menu_dom);

		const b = this.buttons = {};
		b['editor'] = this.add_button(null, 'Editor');

		let p;
		p = this.add_button(b['editor'], 'Change Map');
		p.onclick = async () => {
			const win = await MapChooserWindow.open({ });
		};

		p = this.add_button(b['editor'], 'Browse');
		b['items'] = p = this.add_button(p, 'Items');
		b['recipes'] = p = this.add_button(p, 'Recipes');
		b['npc_crafts'] = p = this.add_button(p, 'NPC Crafts');
		b['npc_sells'] = p = this.add_button(p, 'NPC Goods');
		b['npcs'] = p = this.add_button(p, 'NPCs');
		b['monsters'] = p = this.add_button(p, 'Monsters');
		b['resources'] = p = this.add_button(p, 'Resources');
		b['triggers'] = p = this.add_button(p, 'Triggers');
		b['quests'] = p = this.add_button(p, 'Quests');

		p = this.add_button(null, 'Project');
		b['proj_summary'] = this.add_button(p, 'Show summary');
		b['proj_new'] = this.add_button(p, 'New');
		b['proj_save'] = this.add_button(p, 'Save');
		b['proj_publish'] = this.add_button(p, 'Publish');
		b['proj_rebase'] = this.add_button(p, 'Rebase');
		b['proj_share'] = this.add_button(p, 'Share');

		this.search = newElement('<div style="display: flex; align-items: center; padding-left: 15px;"><i class="fa fa-search" style="color: #fff;"></i><input type="text" style="margin-left: 5px;" placeholder="Quick search"></div>');
		this.dom.append(this.search);

		g_navbar = this;
	}

	add_button(parent, content) {
		const btn = newElement('<li><a href="javascript:void(0);" class="boxMenuLink"><span class="boxMenuLinkTitle">' + content + '</span></a></li>');
		if (!parent) {
			parent = this.dom;
		} else if (!parent.classList.contains('boxMenuHasChildren')) {
			parent.classList.add('boxMenuHasChildren');
			const depth_regex = parent.parentNode.className.match(/boxMenuDepth([0-9]+)/);
			const depth = depth_regex ? (parseInt(depth_regex[1]) + 1 || 1) : 1;
			const sub_list = newElement('<ol class="boxMenuDepth' + depth + '"></ol>');
			parent.append(sub_list);
			parent = sub_list;
		} else {
			parent = parent.querySelector('ol');
		}
		parent.appendChild(btn);
		return btn;
	}

	reload() {
		const b = this.buttons;
		const has_proj = !!db?.metadata[1]?.pid;

		b['proj_summary'].onclick = () => {
			HistoryWindow.open();
		};

		const set_enabled = (btn, enabled) => {
			if (enabled) {
				btn.classList.remove('disabled');
			} else {
				btn.classList.add('disabled');
				btn.onclick = null;
			}
		};

		set_enabled(b['proj_summary'], has_proj);
		set_enabled(b['proj_save'], has_proj);
		set_enabled(b['proj_publish'], has_proj);
		set_enabled(b['proj_rebase'], has_proj);
		set_enabled(b['proj_share'], has_proj);
	}
}
