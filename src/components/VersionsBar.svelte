<script>
	import { versions, currentVersion, versionsTimeExtent, editorContent } from '$stores/versions';
	import cross from '$svg/cross.svg';
	import { scaleLinear } from 'd3-scale';

	function addVersion() {
		const newVersion = $editorContent.getJSON();
		newVersion.updated = Date.now();
		newVersion.words = $versions[$currentVersion].words;
		newVersion.sentences = $versions[$currentVersion].sentences;
		newVersion.readTime = $versions[$currentVersion].readTime;
		newVersion.readability = $versions[$currentVersion].readability;
		$versions.push(newVersion);
		$versions = $versions;
		$currentVersion = $versions.length - 1;

		switchVersion($currentVersion);
	}

	function removeVersion(idx) {
		if ($versions.length === 1) return;
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

	$: versionsScale = scaleLinear().domain($versionsTimeExtent).range([0, 1]);
</script>

<div class="versions-tabs">
	<span class="versions-tabs__container">
		{#each $versions as version, idx}
			<button
				on:click={() => switchVersion(idx)}
				on:contextmenu|preventDefault={() => removeVersion(idx)}
				class="versions-tab"
				class:active={$currentVersion === idx}
				style={`background-color: rgba(30, 41, 59, ${versionsScale(version.updated)});`}
			/>
		{/each}
	</span>

	<button on:click={addVersion} class="versions-add-tab">{@html cross}</button>
</div>

<style>
	.versions-tabs {
		width: 48px;
		border-radius: var(--toolbars-border-radius);
		background-color: var(--toolbars-background-color);
		border: var(--toolbars-border);
		padding: 12px 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.versions-tabs__container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
	}

	.versions-tab {
		/* background-color: var(--toolbars-background-color-opaque); */
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
		position: relative;
	}

	.versions-tab::after {
		content: '';
		position: absolute;
		top: 19px;
		left: 50%;
		background-color: var(--toolbars-color);
		outline: 2px solid var(--toolbars-color);
		height: 10px;
		width: 0px;
	}

	.versions-tab:last-of-type {
		margin-bottom: 0;
	}

	.versions-tab:last-of-type::after {
		content: none;
	}

	.versions-tab.active {
		border: 4px solid var(--color-accent);
		/* background-color: var(--toolbars-color); */
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
