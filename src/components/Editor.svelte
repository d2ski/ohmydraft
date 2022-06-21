<script>
	import { editorContent } from '$stores/versions';
	import TextToolbar from '$components/TextToolbar.svelte';
	import VersionsBar from '$components/VersionsBar.svelte';
	import VersionsStatsTable from '$components/VersionsStatsTable.svelte';
	import VersionsReadabilityTable from '$components/VersionsReadabilityTable.svelte';
	import Tiptap from '$components/Tiptap.svelte';
	import CurrentVersionStats from '$components/CurrentVersionStats.svelte';
</script>

<div class="editor__wrapper" class:hide={!$editorContent}>
	<VersionsStatsTable />
	<VersionsBar />
	<VersionsReadabilityTable />
	<div class="editor__container">
		{#if $editorContent}
			<TextToolbar />
		{/if}

		<Tiptap />
	</div>

	<CurrentVersionStats />
</div>

<style>
	.editor__wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-left: calc(100vw - 100%);
	}

	.editor__container {
		padding: 1.5rem;
		height: 100%;
	}

	.hide {
		display: none;
	}
</style>
