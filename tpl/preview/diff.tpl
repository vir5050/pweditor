{assign type = $obj._db.type}
{assign generic_fields = PWDB.get_type_fields($type) || \{\} }

{if $diff}
	{for fname in $diff}
		{assign f = $generic_fields[$fname]}
		{if !$f}{continue}{/if}
		{* there might be no diff in the end (happens sometimes) *}
		{if DB.cmp($diff[$fname], $prev[$fname]) == 0}{continue}{/if}

		{@PWPreview.render_diff_entry($f, $diff[$fname], $prev[$fname])}
	{/for}
{/if}

{if !$diff}
	<div class="block">No changes</div>
{else if $type == 'npc_sells'}
	{for i = 0; i < 8; i++}
		{if !$diff.pages}{break}{/if}
		{if !$diff.pages[$i]}{continue}{/if}
		{assign pageid = $i}
		{assign page = $diff.pages[$i]}
		{assign prev_page = $prev.pages[$i]}
		<div class="block">
			<span class="header">Tab "{@($page.title ?? $prev.pages?.[$i]?.title) || '(unnamed)'}" #{@$i}</span>
			{if $page.title !== undefined}
				<div class="block">
					<span class="header">Name</span>
					<span class="minus">{@$prev.pages?.[$i]?.title || '(unnamed)'}</span>
					<span class="plus">{@$page.title}</span>
				</div>
			{/if}
			{assign rows = new Set()}
			{for p_item_id in ($page.item_id || \{\})}
				{assign rowid = Math.floor($p_item_id / 8)}
				{$rows.add($rowid)}
			{/for}
			{for rowid of $rows}
				<div class="block">
					<span class="header">Row {@$rowid}</span>
					<div class="goods">
					<div class="flex-rows" style="gap: 2px;">
						<span class="minus"></span>
						<span class="plus"></span>
					</div>
					{for i = 0; i < 8; i++}
						{assign prev_id = $prev_page?.item_id?.[$rowid * 8 + $i] || 0}
						{assign cur_id = $page?.item_id?.[$rowid * 8 + $i] ?? $prev_id}
						<div class="flex-rows" style="gap: 2px;">
							<span class="item {if $prev_id == $cur_id}unchanged{/if}" data-id="{@$prev_id}"><img{ } src="{@PWPreview.get_item_icon($db, $prev_id)}" alt=""></span>
							<span class="item {if $prev_id == $cur_id}unchanged{/if}" data-id="{@$cur_id}"><img{ } src="{@PWPreview.get_item_icon($db, $cur_id)}" alt=""></span>
						</div>
					{/for}
					</div>
				</div>
			{/for}
		</div>
	{/for}
{else if $type == 'npc_crafts'}
	{for i = 0; i < 8; i++}
		{assign pageid = $i}
		{assign page = $diff?.pages?.[$i]}
		{assign obj_page = $obj?.pages?.[$i]}
		{assign prev_page = $prev?.pages?.[$i]}
		{if !$obj_page && !$prev_page}{continue}{/if}

		{assign rows = new Set()}
		{assign modified_ids = new Set()}
		{for p_recipe_id in ($obj_page?.recipe_id || \{\})}
			{assign prev_id = $prev_page?.recipe_id?.[$p_recipe_id] || 0}
			{assign cur_id = $obj_page?.recipe_id?.[$p_recipe_id] || $prev_id}
			{assign is_changed = PWPreview.is_recipe_modified(db.recipes[$cur_id], db.recipes[$prev_id]?._db?.project_initial_state)}
			{if !$is_changed}
				{continue}
			{/if}
			{assign rowid = Math.floor($p_recipe_id / 8)}
			{$rows.add($rowid)}
			{$modified_ids.add(parseInt($p_recipe_id))}
		{/for}

		{if !$rows.size && !$page?.title}
			{continue}
		{/if}

		<div class="block">
			<span class="header">Tab "{@($obj_page?.title ?? $prev?.pages?.[$i]?.title) || '(unnamed)'}" #{@$i}</span>
			{if $page?.title !== undefined}
				<div class="block">
					<span class="header">Name</span>
					<span class="minus">{@$prev.pages?.[$i]?.title || '(unnamed)'}</span>
					<span class="plus">{@$page?.title}</span>
				</div>
			{/if}
			{for rowid of $rows}
				<div class="block">
					<span class="header">Row {@$rowid}</span>
					<div class="crafts">
					{for i = 0; i < 8; i++}
						{assign prev_id = $prev_page?.recipe_id?.[$rowid * 8 + $i] || 0}
						{assign cur_id = $page?.recipe_id?.[$rowid * 8 + $i] ?? $prev_id}
						<div class="flex-rows" style="gap: 2px;">
							{assign unchanged = !$modified_ids.has($rowid * 8 + $i)}
							{assign icon_id = NPCCraftsWindow.get_recipe_icon_id($cur_id)}
							<span class="recipe {if $unchanged}unchanged{/if}" data-id="{if $unchanged && $icon_id == -1}0{else}{@$cur_id}{/if}" data-prev="{@$prev_id || -1}"><img{ } src="{@Item.get_icon($icon_id)}" alt=""></span>
						</div>
					{/for}
					</div>
				</div>
			{/for}
		</div>
	{/for}
{else if $type.startsWith('spawners_')}
	{if $diff.pos && ($diff.pos[0] || $diff.pos[1] || $diff.pos[2])}
		<div class="block">
			<table style="width: 300px;">
				<tr class="header">
					<td style="text-align: left;">Pos</td><td>X</td><td>Y</td><td>Z</td>
				</tr>
				<tr>
					<td style="text-align: right;"><span class="minus">&nbsp;&nbsp;</span></td>
					{for i = 0; i < 3; i++}
						<td>{@Math.floor(($prev.pos[$i] || 0) * 100) / 100}</td>
					{/for}
				</tr>
				<tr>
					<td style="text-align: right;"><span class="plus">&nbsp;&nbsp;</span></td>
					{for i = 0; i < 3; i++}
						<td>{@Math.floor(($diff.pos[$i] || $prev.pos[$i] || 0) * 100) / 100}</td>
					{/for}
				</tr>
			</table>
		</div>
	{/if}

	{if $diff.dir}
		<div class="block">
			{* assume one dir can't be changed without the other *}
			<span class="header">Direction</span>
			<span class="minus">{@Math.round(Math.atan2($prev.dir[2], $prev.dir[0]) * 10000) / 10000}</span>
			<span class="plus">{@Math.round(Math.atan2($diff.dir[2], $diff.dir[0]) * 10000) / 10000}</span>
		</div>
	{/if}

	{for groupidx in ($diff.groups || \{\}) }
		{assign dgroup = $diff.groups[$groupidx]}
		<div class="block">

			{assign dspawned_id = $dgroup.type}
			{assign dspawned = db.npcs[$dspawned_id] || db.monsters[$dspawned_id] || db.mines[$dspawned_id]}
			<span class="header">{if $obj.type == 'npc'}Type{else}Group {@$groupidx + 1}{/if}</span>
			{if $dgroup.type}
				<div class="block">
					{assign pspawned_id = $prev.groups?.[$groupidx]?.type}
					{assign pspawned = db.npcs[$pspawned_id] || db.monsters[$pspawned_id] || db.mines[$pspawned_id]}
					{if $obj.type != 'npc'}<span class="header">Group {@(parseInt($groupidx) + 1)}.</span>{/if}
					{if $pspawned}<span class="minus">{@$pspawned?.name || '(unnamed)'} {@DB.serialize_id($pspawned_id)}</span>{/if}
					<span class="plus">{@$dspawned?.name || '(unnamed)'} {@DB.serialize_id($dspawned_id)}</span>
				</div>
			{/if}
		</div>
	{/for}
{else if $type == 'npcs'}
	{if $obj.npc_tasks_out_changed}
		<div class="block">
			<span class="header">Tasks given</span>
			{assign tasks_out_obj = db.npc_tasks_out[$obj?.id_task_out_service] || \{ \} }
			{assign tasks_out = ($tasks_out_obj.tasks || [])}
			{assign prev_tasks_out = PWPreview.get_state_before_gen($tasks_out_obj, $prev_gen)?.tasks || $tasks_out}

			<div style="display: flex; flex-direction: column; background-color: #2b2b2b; color: #fff;">
				{for ptid of $prev_tasks_out}
					{if !$tasks_out.includes($ptid)}
						{assign task = db.tasks[$ptid]}
						<span class="minus" onclick="TaskWindow.open(\{ obj: db.tasks[{@$ptid}] \}); event.stopPropagation();">{@print_pretty_name($task)}</span>
					{/if}
				{/for}

				{for tid of $tasks_out}
					{if ($tid > 0) != $prev_tasks_out.includes($tid)}
						{assign task = db.tasks[$tid]}
						<span class="plus" onclick="TaskWindow.open(\{ obj: db.tasks[{@$tid}] \}); event.stopPropagation();">{@print_pretty_name($task)}</span>
					{/if}
				{/for}
			</div>
		</div>
	{/if}
	{if $obj.npc_tasks_in_changed}
		<div class="block" style="display: flex; flex-direction: column;">
			<span class="header">Tasks completed</span>
			{assign tasks_in_obj = db.npc_tasks_in[$obj?.id_task_in_service] || \{ \} }
			{assign tasks_in = ($tasks_in_obj.tasks || [])}
			{assign prev_tasks_in = PWPreview.get_state_before_gen($tasks_in_obj, $prev_gen)?.tasks || $tasks_in}

			<div style="display: flex; flex-direction: column; background-color: #2b2b2b; color: #fff;">
				{for ptid of $prev_tasks_in}
					{if !$tasks_in.includes($ptid)}
						{assign task = db.tasks[$ptid]}
						<span class="minus" onclick="TaskWindow.open(\{ obj: db.tasks[{@$ptid}] \}); event.stopPropagation();">{@print_pretty_name($task)}</span>
					{/if}
				{/for}

				{for tid of $tasks_in}
					{if ($tid > 0) != $prev_tasks_in.includes($tid)}
						{assign task = db.tasks[$tid]}
						<span class="plus" onclick="TaskWindow.open(\{ obj: db.tasks[{@$tid}] \}); event.stopPropagation();">{@print_pretty_name($task)}</span>
					{/if}
				{/for}
			</div>
		</div>
	{/if}
{/if}