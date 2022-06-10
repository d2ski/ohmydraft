<script>
	import { versions, editorContent, currentVersion } from '$stores/content.js';
	import TextToolbar from '$components/TextToolbar.svelte';
	import VersionsBar from '$components/VersionsBar.svelte';

	// Controls settings
	let contentFontSize = 1.75;
	$: contentLineHeight = contentFontSize * 1.5;
</script>

<div class="editor__container">

	<VersionsBar />

	<TextToolbar />

	<div
		contenteditable="true"
		class="editor__content"
		bind:innerHTML={$versions[$currentVersion].content}
		bind:this={$editorContent}
		style="font-size: {contentFontSize}rem; line-height: {contentLineHeight}rem;"
	/>
</div>

<style>
	.editor__container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1.5rem;
	}

	.editor__content {
		background-color: #fff;
		height: 100vh;
		padding: 2rem;
		width: var(--editor-content-width);
	}

	.editor__content:active,
	.editor__content:focus {
		outline: none;
	}


</style>
