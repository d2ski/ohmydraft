<script>
	import { versions, editorContent, currentVersion } from '$stores/content.js';
	import TextToolbar from '$components/TextToolbar.svelte';
	import VersionsBar from '$components/VersionsBar.svelte';
	import Tiptap from '$components/Tiptap.svelte';
</script>

<div class="editor__wrapper">
	<VersionsBar />
	<div class="editor__container">
		{#if $editorContent}
			<TextToolbar />
		{/if}

		<!-- <div
			contenteditable="true"
			class="editor__content"
			id="editorContainer"
			bind:innerHTML={$versions[$currentVersion].content}
			bind:this={$editorContent}
			style="font-size: {contentFontSize}rem; line-height: {contentLineHeight}rem;"
		/> -->

		<Tiptap />
	</div>
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
</style>
