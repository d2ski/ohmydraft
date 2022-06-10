<script>
	import { versions, editorContent, currentVersion } from '$stores/content.js';
	import TextToolbar from '$components/TextToolbar.svelte';
	import VersionsBar from '$components/VersionsBar.svelte';

	// Controls settings
	let contentFontSize = 1.75;
	$: contentLineHeight = contentFontSize * 1.5;
</script>

<div class="editor__wrapper">
	<VersionsBar />
	<div class="editor__container">
		
		<TextToolbar />

		<div
			contenteditable="true"
			class="editor__content"
			bind:innerHTML={$versions[$currentVersion].content}
			bind:this={$editorContent}
			style="font-size: {contentFontSize}rem; line-height: {contentLineHeight}rem;"
		/>
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

	.editor__content {
		background-color: var(--background-color);
		color: var(--content-color);
		padding: 4.5rem 3rem 3rem 4.5rem;
		width: var(--editor-content-width);
		min-height: 70vh;
	}

	.editor__content:active,
	.editor__content:focus {
		outline: none;
	}
</style>
