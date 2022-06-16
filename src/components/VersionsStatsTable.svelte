<script>
	import { versions } from '$stores/versions';
	import VersionStatsChart from '$components/VersionStatsChart.svelte';
	import { fmtReadTime } from '$utils/helpers';
</script>

<div class="versions-stats">
	<div class="versions-stats__container">
		{#each $versions as version}
			<div class="versions-stats__row">
				<div class="versions-stats__row__stats">
					<div class="stats-time">{fmtReadTime(version.readTime)}</div>
					<div class="stats-readability">{version.readability}</div>
					<div class="stats-words">{version.words}</div>
				</div>
				<VersionStatsChart
					width="80"
					height="20"
					readability={version.readability}
					words={version.words}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.versions-stats {
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

	.versions-stats__container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0;
	}

	.versions-stats__row {
		padding: 0;
		margin: 0;
		height: 20px;
		line-height: 14px;
		font-size: 14px;
		margin-bottom: 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	.versions-stats__row__stats {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		column-gap: 6px;
		text-align: right;
		align-items: center;
	}

	.stats-time {
		color: #a3a3a3;
	}

	.stats-readability {
		color: #171717;
	}

	.stats-words {
		color: #a3a3a3;
		text-align: left;
		border-left: 1px solid #a3a3a3;
		padding-left: 6px;
	}
</style>
