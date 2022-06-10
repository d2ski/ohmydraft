<script>
import {versions, currentVersion, editorContent} from '$stores/content.js';
import cross from '$svg/cross.svg';

function addVersion() {
		$versions.push({
			content: $versions[$currentVersion].content
		});
		$versions = $versions;
		$currentVersion = $versions.length - 1;
		$editorContent.focus();
	}

	function removeVersion(idx) {
		$versions.splice(idx, 1);
		$versions = $versions;
		$currentVersion = Math.min(idx, $versions.length - 1);
		$editorContent.focus();
	}
</script>

<div class="versions-tabs">
    <span class="versions-tabs__container">
        {#each $versions as version, idx}
            <button
                on:click={() => ($currentVersion = idx)}
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

	.versions-tabs__container {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0;
	}

	.versions-tabs__container::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 2px;
		background-color: #fff;
		outline: 2px solid #fff;
		height: 0px;
		width: calc(100% - 4px);
	}

	.versions-tab {
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

	.versions-tab:last-of-type {
		margin-right: 0;
	}

	.versions-tab.active {
		border: 4px solid #2dd4bf;
		background-color: #fafaf9;
		color: #1e293b;
	}

	.versions-add-tab {
		background-color: transparent;
		fill: none;
		stroke: #2dd4bf;
		stroke-width: 8px;
		border: none;
		width: 14px;
		height: 14px;
		margin-left: 12px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.versions-add-tab:hover {
		stroke: #fafaf9;
	}
</style>