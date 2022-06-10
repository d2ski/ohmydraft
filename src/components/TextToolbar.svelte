<script>
    import {versions, editorContent, currentVersion} from '$stores/content.js';
	import cross from '$svg/cross.svg';

    const markColors = ['#EECC6680', '#EE99AA80', '#6699CC80'];

	function syncContent() {
		$versions[$currentVersion].content = $editorContent.innerHTML;
	}

	function markString(color) {
		const selection = document.getSelection();
		const range = selection.getRangeAt(0);

		const markNode = document.createElement('mark');
		markNode.innerHTML = selection.toString();
		markNode.style.backgroundColor = color;

		range.deleteContents();
		range.insertNode(markNode);
		syncContent();
	}

	function removeMarkString() {
		const selection = document.getSelection();
		const range = selection.getRangeAt(0);
		range.selectNode(selection.anchorNode.parentNode);

		const markNode = document.createTextNode(selection.toString());
		range.deleteContents();
		range.insertNode(markNode);

		range.commonAncestorContainer.normalize();
		syncContent();
	}
</script>

<div class="toolbar__controls">
	<div class="toolbar__controls_marks">
		{#each markColors as color}
			<button
				class="btn-control-mark"
				style="background-color: {color};"
				on:click={() => markString(color)}
			/>
		{/each}

		<button class="btn-control-mark-remove" on:click={removeMarkString}
			><span>{@html cross}</span></button
		>
	</div>

	<div class="toolbar__controls_headers">
		<button class="btn-control-header" on:click={removeMarkString}>H1</button>
		<button class="btn-control-header" on:click={removeMarkString}>H2</button>
		<button class="btn-control-header" on:click={removeMarkString}>H3</button>
	</div>
</div>

<style>
	.toolbar__controls {
		margin-top: 1rem;
		height: 42px;
		width: var(--editor-content-width);
		border-radius: 6px;
		background-color: #f3f4f6;
		padding: 6px 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
	}

	.toolbar__controls_marks {
		display: flex;
	}

	.btn-control-mark {
		border: 1px solid #d1d5db;
		border-radius: 3px;
		width: 28px;
		height: 20px;
		margin-right: 7px;
		cursor: pointer;
	}

	.btn-control-mark:hover {
		border: 2px solid #fafaf9;
	}

	.btn-control-mark-remove {
		width: 20px;
		height: 20px;
		border: none;
		background-color: transparent;
		cursor: pointer;
		fill: #212121;
		stroke: #212121;
		stroke-width: 5px;
		text-align: center;
		line-height: 0;
	}

	.btn-control-mark-remove span {
		width: 13px;
		height: 13px;
		line-height: 0;
		transform: rotate(45deg);
		display: inline-block;
	}

	.toolbar__controls_headers {
		display: flex;
	}

	.btn-control-header {
		background-color: transparent;
		border: 1px solid #d1d5db;
		border-radius: 3px;
		width: 28px;
		height: 20px;
		margin-right: 7px;
		cursor: pointer;
		font-weight: 400;
		font-size: 14px;
		color: #212121;
		line-height: 14px;
	}

	.btn-control-header:hover {
		border: 2px solid #fafaf9;
	}
</style>
