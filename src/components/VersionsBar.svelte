<script>
	import { versions, currentVersion, editorContent } from '$stores/content.js';
	import cross from '$svg/cross.svg';

	function addVersion() {
		$versions.push($editorContent.getJSON());
		$versions = $versions;
		$currentVersion = $versions.length - 1;
		switchVersion($currentVersion);
	}

	function removeVersion(idx) {
		$versions.splice(idx, 1);
		$versions = $versions;
		$currentVersion = Math.min(idx, $versions.length - 1);
		switchVersion($currentVersion);
	}

	function switchVersion(idx) {
		$currentVersion = idx;
		$editorContent.commands.setContent($versions[idx]);
		$editorContent.commands.focus();
	}
</script>

<div class="versions-tabs">
	<span class="versions-tabs__container">
		{#each $versions as version, idx}
			<button
				on:click={() => switchVersion(idx)}
				on:contextmenu|preventDefault={() => removeVersion(idx)}
				class="versions-tab"
				class:active={$currentVersion === idx}
			/>
		{/each}
	</span>

	<button on:click={addVersion} class="versions-add-tab">{@html cross}</button>
</div>

<style>
	.versions-tabs {
		height: 50vh;
		min-height: 50vh;
		width: 48px;
		border-radius: var(--toolbars-border-radius);
		background-color: var(--toolbars-background-color);
		border: var(--toolbars-border);
		padding: 12px 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1.5rem;
		position: sticky;
		top: 84px;
	}

	.versions-tabs__container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
	}

	.versions-tabs__container::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 50%;
		background-color: var(--toolbars-color);
		outline: 2px solid var(--toolbars-color);
		height: calc(100% - 4px);
		width: 0px;
	}

	.versions-tab {
		background-color: var(--toolbars-background-color-opaque);
		color: var(--toolbars-color);
		border: 3px solid var(--toolbars-color);
		border-radius: 50%;
		padding: 0;
		margin: 0;
		cursor: pointer;
		width: 20px;
		height: 20px;
		line-height: 0px;
		font-size: 12px;
		margin-bottom: 12px;
		transition: all 0.2s ease-in-out;
		z-index: 1;
	}

	.versions-tab:last-of-type {
		margin-bottom: 0;
	}

	.versions-tab.active {
		border: 4px solid var(--color-accent);
		background-color: var(--toolbars-color);
	}

	.versions-add-tab {
		background-color: transparent;
		fill: none;
		stroke: var(--toolbars-color);
		stroke-width: 8px;
		border: none;
		width: 14px;
		height: 14px;
		margin-top: 12px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.versions-add-tab:hover {
		stroke: var(--color-accent);
	}
</style>
