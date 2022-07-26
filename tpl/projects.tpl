<div id="root">
	<div class="headline">
		Open a recent project or create a new one
	</div>
	<div class="recent">
		<div class="create" onclick="{serialize $projects}.new_project();">
			<i class="fa fa-plus"></i><span>Create</span>
		</div>
		{for project of $projects.recent}
		<a href="{@ROOT_URL + '?id=' + $project.id}" class="{if $project.last_open_time <= $project.last_edit_time}bold{/if}" onclick="Editor.open_project({@$project.id}); this.classList.remove('bold'); event.preventDefault();">
			<img src="{@Item.get_icon(164)}" alt="">
			<span>{@$project.name}</span>
		</a>
		{/for}
	</div>

	<div class="chooser">
		<div class="categories">
			<div onclick="{serialize $projects}.select_tab('my')" class="{if $projects.cur_tab == 'my'}selected{/if}">My projects</div>
			<div onclick="{serialize $projects}.select_tab('all')" class="{if $projects.cur_tab == 'all'}selected{/if}">All projects</div>
			<div onclick="{serialize $projects}.select_tab('review')" class="{if $projects.cur_tab == 'review'}selected{/if}">Awaiting review</div>
			<div onclick="{serialize $projects}.select_tab('approved')" class="{if $projects.cur_tab == 'approved'}selected{/if}">Ready for testing</div>
			<div onclick="{serialize $projects}.select_tab('merged')" class="{if $projects.cur_tab == 'merged'}selected{/if}">Merged</div>
			<div onclick="{serialize $projects}.select_tab('trashed')" class="{if $projects.cur_tab == 'trashed'}selected{/if}">Trashed</div>
		</div>
	</div>

	<div class="projects-container">
		<div class="search">
			<input type="text" placeholder="(Search ...)" id="search" value="{@$projects.search_str || ''}" autocomplete="off" oninput="{serialize $projects}.onsearch(this.value);">
		</div>

		<div class="loading" style="position: relative; width: 100%; z-index: 99; {if !$loading}display: none;{/if}">
			<div class="spinner" style="position: absolute; top: 25px;">
				<span class="icon icon48 fa-spinner"></span>
				<span>Loading ...</span>
			</div>
		</div>

		<table class="projects">
			<tr>
				<th>Name</th>
				<th>Status</th>
				<th style="width: 186px;">Owner</th>
				<th style="width: 186px;">Edit time</th>
				<th style="width: 35px; position: relative;">
					<a class="button" style="position: absolute; right: 0; top: 3px; padding: 5px 10px;" href="javascript:void(0);" onclick="{serialize $projects}.refresh_projects();"><i class="fa fa-refresh"></i></a>
				</th>
			</tr>

			{for project of $projects.list}
				<tr class="{if !$project.is_public}private{/if} {if $project.last_open_time <= $project.last_edit_time}bold{/if}" onclick="Editor.open_project({@$project.id}); this.classList.remove('bold'); event.preventDefault();">
					<td>
						<a class="name" href="{@ROOT_URL + '?id=' + $project.id}">
							{if !$project.is_public}
								<i class="fa fa-eye-slash" style="color: #008c00;"></i>
							{/if}
							<img src="{@Item.get_icon(164)}" alt="">
							<span style="">{@$project.name}</span>
						</a>
					</td>
					<td>
						<a class="labels" href="{@ROOT_URL + '?id=' + $project.id}">
							{assign type = Projects.type.find(t => t.id == $project.type)}
							<div class="badge {@$type.color}">{@$type.name}</div>
							{assign status = Projects.status.find(s => s.id == $project.status)}
							<div class="badge {@$status.color}">{@$status.name}</div>
						</div>
					</td>
					<td>
						<a href="{@ROOT_URL + '?id=' + $project.id}" class="username">
							<img src="{@$project.avatar}">
							<span>{@$project.username}</span>
						</a>
					</td>
					<td><a href="{@ROOT_URL + '?id=' + $project.id}">
						<div data-datetime="{@$project.last_edit_time}"></div>
					</a></td>
					<td onclick="{serialize $projects}.onclick_project_dots(this, event, {@$project.id}); event.stopPropagation();" class="details-button"><i class="fa fa-ellipsis-v"></i></td>
				</tr>
			{/for}

		</table>

		{if $projects.list_incomplete}
			<div style="display: flex;">
				<a class="button" style="margin: auto; margin-top: 8px;" onclick="{serialize $projects}.load_more(this);">Load More</a>
			</div>
		{/if}
		<a class="button buttonPrimary" style="float: right; margin-top: 14px;" href="javascript:void(0);" onclick="{serialize $projects}.new_project();">New project</a>
	</div>

	<div id="modify_project_dialogue" style="display: none;">
		{assign project = $project || \{ \}}
		<div style="display: flex; align-items: baseline;">
			<div style="width: 50px;">Name:</div>
			<input type="text" name="name" value="{@$project.name}" style="flex: 1;" autocomplete="off">
		</div>

		<div style="display: flex; align-items: baseline; margin-top: 8px;">
			<div style="width: 50px; align-self: end;">Type:</div>
			<form action="none">
				{for t of Projects.type}
					<label>
						<input type="radio" name="type" value="{@$t.id}" {if $t.id == $project.type}checked{/if}>
						<span class="badge label {@$t.color}">{@$t.name}</span>
					</label>
				{/for}
			</form>
		</div>
	</div>
</div>

{@@
<style>
#root {
	position: absolute;
	width: 100%;
	height: calc(100% - 50px);
	overflow-y: auto;
	padding-bottom: 80px;
	background: white;
}

#root > * {
	padding: 24px 10%;
}

.search {
	display: flex;
	padding-bottom: 4px;
}

.search > input {
	flex: 1;
}

#root > .headline {
	background: #f1f3f4;
	padding-top: 30px;
	padding-bottom: 8px;
	font-size: 15px;
	font-weight: bold;
}

#root > .recent {
	display: flex;
	flex-wrap: wrap;
	background: #f1f3f4;
	column-gap: 10px;
	padding-top: 10px;

	overflow: hidden;
	max-height: 108px;
	row-gap: 50px;
}

.recent > * {
	border: 1px solid #dadce0;
	border-radius: 5px;
	padding: 20px;
	background: white;
	box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 10%);
	cursor: pointer;
	display: flex;
	align-items: center;
}

.recent > *:hover {
	border: 1px solid #bf4444;
}

.recent > * > span {
	margin-left: 6px;
	overflow-wrap: break-word;
	max-width: 100px;
	overflow: hidden;
	line-height: 20px;
	max-height: 40px;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: initial;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.recent > .create {
	width: 120px;
	display: flex;
	justify-content: center;
	background-size: 10px 10px;
	background-position: -6px -5px;
	background-image:
		linear-gradient(to right, #efefef 1px, transparent 1px),
		linear-gradient(to bottom, #efefef 1px, transparent 1px);
}

#root > .chooser {
	background: #f1f3f4;
	padding-top: 0;
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

.projects {
	border-collapse: collapse;
	width: 100%;
}

.projects td, .projects th {
	border: none;
}

.projects th {
	padding: 8px;
}

.projects tr:not(:first-child):not(:last-child) { border-bottom: 1px solid #ddd; }
.projects tr:not(:first-child):not(.loading):hover {
	background-color: #ddd;
	cursor: pointer;
}

.projects th {
	padding-bottom: 20px;
	text-align: left;
}

.recent a,
.projects a {
	color: #502c2c;
}

.projects a {
	padding: 8px;
}

.projects .name {
	display: flex;
	column-gap: 6px;
	align-items: center;
}

.projects tr.bold .name,
.recent .bold span {
	font-weight: bold;
}

.projects img {
	width: 20px;
	height: 20px;
}

.projects .labels {
	display: flex;
	column-gap: 5px;
}

.projects .username {
	display: flex;
	column-gap: 5px;
}

.projects .details-button {
	padding: 0 15px;
}

.projects .details-button > i { color: #757070; }
.projects .details-button:hover { background: #b5b1b1; }
.projects .details-button:hover > i { color: rgba(80, 44, 44, 1); }

.projects .private span,
.projects .private a {
	color: gray;
}
</style>
@@}