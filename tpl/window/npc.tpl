<script id="tpl-npc-goods" type="text/x-dot-template">
<div class="window" style="width: 308px; height: 400px;">
<div class="header">
	<span>
		NPC Goods: {@$goods._name || "(unnamed)"} #{@$goods.id}
	</span>
	<div class="menu">
		<i class="minimize fa"></i>
		<i class="maximize fa"></i>
		<i class="close fa fa-close"></i>
	</div>
</div>
<div class="content flex-rows">
	<div class="flex-columns" style="align-items: center; margin-bottom: 8px;">
		<span style="width: 45px;">Name:</span>
		<input type="text" style="flex: 1; width: 100%;" placeholder="(unnamed)" data-link="{serialize $win}.goods => '_name'">
	</div>
	<div style="font-size: 12px; background-color: var(--header-color); color: white; padding: 2px 8px; margin: 0 -12px; margin-bottom: 4px;">Tabs:</div>
	<div id="tabs" class="flex-columns flex-gap" style="flex-wrap: wrap; margin-bottom: 16px;">
	{for i = 0; i < 8; i++}
		{assign tab = $goods.pages[i]}
		<input type="text" placeholder="(None)" class="tabname" onfocus="{serialize $win}.select({@$i});" data-link="{serialize $win}.goods => 'pages', {@$i}, 'page_title'">
	{/for}
	</div>
	<div id="items" class="flex-columns flex-gap" style="flex-wrap: wrap">
	{assign tab = $goods.pages[$win.selected_tab || 0]}
	{for i = 0; i < 32; i++}
		{assign item = db.items[$tab.item_id[i] || 0]}
		<pw-item pw-icon="{@$item?.icon || 0}"></pw-item>
	{/for}
	</div>
</div>
</div>

TEMPLATE_END
<style>
#tabs {
	margin-right: -8px;
	margin-top: 0px;
}

input[type="text"].tabname {
	width: 55px;
	padding: 2px 4px;
	margin-right: 8px;
	margin-top: 4px;
	position:relative;
	margin-bottom: 4px;
}

input[type="text"].tabname.selected {
	border-bottom: 5px solid #e0b0b0;
	margin-bottom: 0px;
}

#items {
	margin-right: -4px;
}

#items > * {
	margin-right: 4px;
	margin-top: 4px;
}
</style>
</script>

<script id="tpl-npc" type="text/x-dot-template">

<div class="window resizable" style="width: 350px; height: 400px;">
<div class="header">
	<span>
		{@($npc?.id ? (($npc?.name ?? "(unknown)") || "(unnamed)") : "(none)")} #{@$npc.id}
	</span>
	<div class="menu">
		<i class="minimize fa"></i>
		<i class="maximize fa"></i>
		<i class="close fa fa-close"></i>
	</div>
</div>
<div class="content flex-rows" style="overflow: hidden;">
	<div class="flex-columns" style="align-items: center; margin-bottom: 8px;">
		<span style="width: 45px;">Name:</span>
		<input type="text" style="flex: 1; width: 100%;" placeholder="(unnamed)" data-link="{serialize $win}.npc => 'name'">
	</div>
	<div class="flex-columns" style="margin-bottom: 8px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-top: -8px">
		<div class="flex-columns" style="align-items: center; margin-top: 8px;">
			<span style="width: 45px;">Type:</span>
			<select id="type" style="">
				<option value="npc">NPC</option>
				<option value="guard">Guard</option>
			</select>
		</div>
		<div id="model" class="flex-columns" style="align-items: center; margin-top: 8px;">
			<span style="width: 45px;">Model:</span>
			{assign name = "(default)"}
			{foreach mtype in NPCModelChooserWindow.models}
				{if NPCModelChooserWindow.models[mtype].file == $npc.file_model}
					{assign name = NPCModelChooserWindow.models[mtype].name}
				{/if}
			{/foreach}

			<a class="button" onclick="{serialize $win}.choose_model();">{@$name}&nbsp;<i class="fa fa-angle-right"></i></a>
		</div>
	</div>
	<div class="flex-columns" style="margin-bottom: 8px; align-items: center; justify-content: space-between;">
		<div>
			<span style="margin-right: 8px;">Sell:</span>
			{assign sells = db.npc_sells[$npc.id_sell_service];}
			<a class="button" onclick=";">{@ $sells?._name ?? ($sells ? ($sells.name || "(unnamed)") : "(none)" ) }&nbsp;<i class="fa fa-angle-right"></i></a>
		</div>
		<div>
			<span style="margin-right: 8px;">Craft:</span>
			{assign craft = db.npc_crafts[$npc.id_make_service];}
			<a class="button" onclick=";">{@ $craft?._name ?? ($craft ? ($craft.name || "(unnamed)") : "(none)" ) }&nbsp;<i class="fa fa-angle-right"></i></a>
		</div>
	</div>
	<div>Greeting:</div>
	<div class="pw-editable-color-text">
		<code contenteditable="true" onkeyup="{serialize $win}.update_caret();" onmouseup="{serialize $win}.update_caret();" onpaste="setTimeout(() => {serialize $win}.save_greeting(), 1);" oninput="{serialize $win}.format_greeting();">
			{@$npc.greeting?.replace('\n', '<br>') || ""}
		</code>
		<div class="color" onclick="{serialize $win}.insert_color();" title="Add color">
			<i class="fa fa-adjust"></i>
		</div>
	</div>
</div>
</div>

{@@
<style>
.hidden {
	visibility: hidden;
	position: absolute;
}

</style>
@@}
</script>

