<script id="tpl-page-objshare" type="text/x-dot-template">
<div id="root">

    <div class="chooser">
        <div style="padding: 4px;">Choose to share either the current, fixed state, or an auto-updating state synced with the latest game version</div>
        <div class="categories" style="margin-top: 8px;">
            <div onclick="{serialize $page}.select_tab('current')" class="{if $page.cur_tab == 'current'}selected{/if}">Current state</div>
            <div onclick="{serialize $page}.select_tab('latest')" class="{if $page.cur_tab == 'latest'}selected{/if}">Always latest state</div></div>
    </div>
    <div id="body" style="">
        {if $loading}
            <div class="loading-spinner" style="margin-top: 50px;"></div>
        {else}
            <div style="display: flex;">
                <input style="flex: 1; cursor: text;" type="text" value="{@$page.url}" disabled>
            </div>

            <div style="margin-top: 8px; height: 100%; overflow-y: auto;">
                {if $page.cur_tab == 'current'}
                    <span style="padding: 4px;">Coming soon!</span>
                {else}
                    {if $page.cur_tab == 'latest' && $opts.use_latest_state == -1}
                        <span style="padding: 4px;">Note: Latest state differs from the one in this project</span>
                    {/if}
                    <iframe style="width: 100%; height: calc(100% - 36px); margin-top: 8px;" src="{@$page.url}"></iframe>
                {/if}
            </div>
        {/if}
    </div>
</div>

{@@
<style>
#root {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    overflow: hidden;
}

#root > .chooser {
	background: #f1f3f4;
	padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 0;
	border-bottom: 1px solid #dadce0;
}

.categories {
	display: flex;
	column-gap: 10px;
}

.categories > * {
	padding: 10px 18px;
	border: 1px solid #dadce0;
	margin-bottom: -1px;
	background: #eaeaea;
	cursor: pointer;
}

.categories > *:hover {
	border: 1px solid #aaaca0;
	background: #dadada;
}

.categories > .selected {
	background: white;
	border-bottom: none;
}

#body {
    width: 800px;
    height: 600px;
	padding: 20px;
}

@keyframes spinner {
	to { transform: rotate(360deg); }
}

.loading-spinner {
	position: relative;
}

.loading-spinner:before {
	content: '';
	visibility: visible;
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 20px;
	height: 20px;
	margin-top: -10px;
	margin-left: -10px;
	border-radius: 50%;
	border-top: 2px solid #07d;
	border-right: 2px solid transparent;
	animation: spinner .6s linear infinite;
}
</style>
@@}
</script>