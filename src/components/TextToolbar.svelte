<script>
	import { versions, editorContent, currentVersion } from '$stores/content.js';

	const markColors = ['#EECC6680', '#EE99AA80', '#6699CC80'];
	const headerLevels = [1, 2, 3];

	function syncContent() {
		$versions[$currentVersion].content = $editorContent.innerHTML;
	}
</script>

<div class="toolbar__controls">
	<div class="toolbar__controls_marks">
		{#each markColors as color}
			<button
				class="btn-control-mark"
				style="background-color: {color};"
				on:click={() => $editorContent.chain().focus().toggleHighlight({ color: color }).run()}
				class:active={$editorContent.isActive('highlight', { color })}
			/>
		{/each}
	</div>

	<div class="toolbar__controls_headers">
		{#each headerLevels as level}
			<button
				class="btn-control-header"
				on:click={() => $editorContent.chain().focus().toggleHeading({ level }).run()}
				class:active={$editorContent.isActive('heading', { level })}>{`H${level}`}</button
			>
		{/each}
	</div>
</div>

<style>
	.toolbar__controls {
		height: 48px;
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
		z-index: 999;
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

	.btn-control-mark.active {
		border: 3px solid var(--color-accent);
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
		text-align: center;
		padding: 0px;
	}

	.btn-control-header:hover {
		color: var(--color-accent);
	}

	.btn-control-header.active {
		color: var(--color-accent);
	}
</style>
