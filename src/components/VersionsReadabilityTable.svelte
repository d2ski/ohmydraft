<script>
	import { versions } from '$stores/versions';
	import { READABILITY_LEVELS as LEVELS } from '$utils/text-stats';
</script>

<div class="versions-readability">
	<div class="versions-readability__container">
		{#each $versions as { readability }}
			<div class="versions-readability__row">
				<span
					class="readability"
                    class:normal={readability <= LEVELS.NORMAL}
					class:hard={readability > LEVELS.NORMAL && readability <= LEVELS.HARD}
					class:very-hard={readability > LEVELS.HARD}>{readability ? readability : 0}</span
				>
			</div>
		{/each}
	</div>
</div>

<style>
	.versions-readability {
		height: 100%;
		min-height: 50vh;
		padding: 14px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		position: sticky;
		top: 84px;
	}

	.versions-readability__container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0;
	}

	.versions-readability__row {
		padding: 0;
		margin: 0;
		height: 20px;
		line-height: 14px;
		font-size: 14px;
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.readability {
		color: var(--toolbars-color);
		text-align: center;
		width: 24px;
        height: 20px;
		line-height: 14px;
		padding: 3px 3px;
		margin-left: 6px;
		border-radius: 3px;
	}

    .normal {
        border: 1px dashed #a3a3a3;
    }

	.hard {
		background-color: var(--readability-hard-color);
	}

	.very-hard {
		background-color: var(--readability-very-hard-color);
	}
</style>
