<script>
	import cross from '$svg/cross.svg';

	let versions = [
		{
			content:
				'С 8 июня физлица могут переводить из России на счета за рубеж до 150 тыс. долларов в месяц или эквивалентную сумму в другой валюте. Такую же сумму могут переводить на зарубежные счета нерезиденты — физлица из «дружественных» стран. '
		},
		{
			content: 'second'
		}
	];

	let currentVersion = 0;
	let content;

	function syncContent() {
		versions[currentVersion].content = content.innerHTML;
	}

	function addVersion() {
		versions.push({
			content: versions[currentVersion].content
		});
		versions = versions;
		currentVersion = versions.length - 1;
		content.focus();
	}

	function removeVersion(idx) {
		versions.splice(idx, 1);
		versions = versions;
		currentVersion = Math.min(idx, versions.length - 1);
		content.focus();
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

	// Controls settings

	let contentFontSize = 1.75;
	$: contentLineHeight = contentFontSize * 1.5;

	const markColors = ['#EECC6680', '#EE99AA80', '#6699CC80'];
</script>

<div class="editor__container">
	<div class="editor__versions-tabs">
		<span class="editor__versions-tabs__container">
			{#each versions as version, idx}
				<button
					on:click={() => (currentVersion = idx)}
					on:contextmenu|preventDefault={() => removeVersion(idx)}
					class="editor__versions-tab"
					class:active={currentVersion === idx}
				/>
			{/each}
		</span>

		<button on:click={addVersion} class="editor__versions-add-tab">{@html cross}</button>
	</div>

	<div class="editor__controls">
		<div class="editor__controls_marks">
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

		<div class="editor__controls_headers">
			<button class="btn-control-header" on:click={removeMarkString}>H1</button>
			<button class="btn-control-header" on:click={removeMarkString}>H2</button>
			<button class="btn-control-header" on:click={removeMarkString}>H3</button>
		</div>
	</div>

	<div
		contenteditable="true"
		class="editor__content"
		bind:innerHTML={versions[currentVersion].content}
		bind:this={content}
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

	.editor__versions-tabs {
		height: 42px;
		width: var(--editor-content-width);
		border-radius: 6px;
		background-color: #1e293b;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
		padding: 6px 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.editor__versions-tabs__container {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0;
	}

	.editor__versions-tabs__container::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 2px;
		background-color: #fff;
		outline: 2px solid #fff;
		height: 0px;
		width: calc(100% - 4px);
	}

	.editor__versions-tab {
		background-color: #1e293b;
		color: #fafaf9;
		border: 2px solid #fafaf9;
		border-radius: 50%;
		padding: 0;
		margin: 0;
		cursor: pointer;
		width: 20px;
		height: 20px;
		line-height: 0px;
		font-size: 12px;
		margin-right: 12px;
		transition: all 0.2s ease-in-out;
		z-index: 1;
	}

	.editor__versions-tab:last-of-type {
		margin-right: 0;
	}

	.editor__versions-tab.active {
		border: 4px solid #2dd4bf;
		background-color: #fafaf9;
		color: #1e293b;
	}

	.editor__versions-add-tab {
		background-color: transparent;
		fill: none;
		stroke: #2dd4bf;
		stroke-width: 5px;
		border: none;
		width: 14px;
		height: 14px;
		margin-left: 12px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.editor__versions-add-tab:hover {
		stroke: #fafaf9;
	}

	.editor__controls {
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
	}

	.editor__controls_marks {
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

	.editor__controls_headers {
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
