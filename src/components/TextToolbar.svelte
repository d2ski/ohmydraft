<script>
	import { versions, editorContent, currentVersion } from '$stores/content.js';
	import cross from '$svg/cross.svg';

	const markColors = ['#EECC6680', '#EE99AA80', '#6699CC80'];

	const styleH1 = {
		'font-size': '3rem',
		'line-height': '3.5rem',
		'margin-bottom': '1.5rem'
	}

	const styleH2 = {
		'font-size': '2.5rem',
		'line-height': '3rem',
		'margin-bottom': '1.25rem'
	}

	const styleH3 = {
		'font-size': '2rem',
		'line-height': '2.5rem',
		'margin-bottom': '1rem'
	}

	function syncContent() {
		$versions[$currentVersion].content = $editorContent.innerHTML;
	}

	function stringifyCSS(props) {
		return Object.entries(props)
			.map(([k, v]) => `${k}: ${v};`)
			.join(' ');
	}

	function addTag(tag, props) {
		const selection = document.getSelection();
		const range = selection.getRangeAt(0);
		const markNode = document.createElement(tag);

		markNode.textContent = selection.toString();
		if (props) markNode.style.cssText = stringifyCSS(props);
		range.deleteContents();
		range.insertNode(markNode);

		syncContent();
	}

	function deleteTag() {
		const selection = document.getSelection();
		const range = selection.getRangeAt(0);
		const markNode = document.createTextNode(selection.toString());

		range.selectNode(selection.anchorNode.parentNode);
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
				on:click={() => addTag('mark', { 'background-color': color })}
			/>
		{/each}

		<button class="btn-control-mark-remove" on:click={deleteTag}
			><span>{@html cross}</span></button
		>
	</div>

	<div class="toolbar__controls_headers">
		<button class="btn-control-header" on:click={() => addTag('h1', styleH1)}>H1</button>
		<button class="btn-control-header" on:click={() => addTag('h2', styleH2)}>H2</button>
		<button class="btn-control-header" on:click={() => addTag('h3', styleH3)}>H3</button>
	</div>
</div>

<style>
	.toolbar__controls {
		height: 42px;
		width: var(--editor-content-width);
		border-radius: var(--toolbars-border-radius);
		background-color: var(--toolbars-background-color);
		backdrop-filter: blur(1px);
		border: var(--toolbars-border);
		padding: 6px 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		position: sticky;
		top: 1.5rem;
	}

	.toolbar__controls_marks {
		display: flex;
	}

	.btn-control-mark {
		border: none;
		border-radius: 3px;
		width: 28px;
		height: 20px;
		margin-right: 7px;
		cursor: pointer;
	}

	.btn-control-mark:hover {
		border: 3px solid var(--color-accent);
	}

	.btn-control-mark-remove {
		width: 20px;
		height: 20px;
		border: none;
		background-color: transparent;
		cursor: pointer;
		fill: var(--toolbars-color);
		stroke: var(--toolbars-color);
		stroke-width: 6px;
		text-align: center;
		line-height: 0;
	}

	.btn-control-mark-remove:hover {
		fill: var(--color-accent);
		stroke: var(--color-accent);
		stroke-width: 5px;
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
		border: none;
		color: var(--toolbars-color);
		border-radius: 3px;
		width: 28px;
		height: 20px;
		margin-right: 7px;
		cursor: pointer;
		font-weight: 700;
		font-size: 16px;
		line-height: 16px;
	}

	.btn-control-header:hover {
		color: var(--color-accent);
	}
</style>
