<script>
	import { editorContent } from '$stores/versions';
	import logo from '$svg/logo-sm.svg';
	import TextToolbar from '$components/TextToolbar.svelte';
	import VersionsBar from '$components/VersionsBar.svelte';
	import VersionsStatsTable from '$components/VersionsStatsTable.svelte';
	import VersionsReadabilityTable from '$components/VersionsReadabilityTable.svelte';
	import Tiptap from '$components/Tiptap.svelte';
	import CurrentVersionStats from '$components/CurrentVersionStats.svelte';

</script>

<div class="editor__wrapper" class:hide={!$editorContent}>
	<div class="editor__left-sidebar">


		<div class="editor__left-sidebar__controls">

			<VersionsStatsTable />
			<VersionsBar />
			<VersionsReadabilityTable />
		</div>
	</div>
	<div class="editor__container">
		{#if $editorContent}
			<TextToolbar />
		{/if}

		<Tiptap />
	</div>

	<div class="editor__right-sidebar">
		<div class="editor__right-sidebar__logo">
			{@html logo}
			beta
		</div>
		<CurrentVersionStats />
	</div>
</div>

<style>
	.editor__wrapper {
		display: grid;
		grid-template-columns: 220px auto 200px;
		width: 100%;
		max-width: calc(var(--editor-content-width) + 220px + 200px + 100px);
		margin: 0 auto;
	}

	.editor__container {
		padding: 1.5rem;
		height: 100%;
		width: var(--editor-content-width);
		margin: 0 auto;
	}

	.editor__left-sidebar {
		align-self: start;
		position: sticky;
		top: 84px;
	}

	.editor__left-sidebar__controls {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.editor__right-sidebar__logo {
		position: fixed;
		top: 15px;
		right: 15px;
		height: 46px;
		width: 46px;
		font-size: 10px;
		line-height: 10px;
		text-align: right;
		color: var(--content-color);
	}

	.hide {
		display: none;
	}
</style>
