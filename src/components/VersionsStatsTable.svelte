<script>
	import { versions } from '$stores/versions';
	import VersionStatsChart from '$components/VersionStatsChart.svelte';
	import { fmtReadTime } from '$utils/helpers';
</script>

<div class="versions-stats">
	<div class="versions-stats__container">
		{#each $versions as { readTime, words }}
			<div class="versions-stats__row">
				<div class="versions-stats__row__stats">
					<div class="stats-time">{readTime ? fmtReadTime(readTime) : '0 sec'}</div>
					<!-- <div class="stats-readability">{readability ? readability : 0}</div> -->
					<div class="stats-words">{words ? words : 0} words</div>
				</div>
				<div class="versions-stats__row__chart">

					<VersionStatsChart width="80" height="2" {words} />
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.versions-stats {
		height: 100%;
		width: 100%;
		min-height: 50vh;
		padding: 14px 0;
		display: flex;
		flex-direction: column;
		align-items: right;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
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
		width: 100%;
		line-height: 14px;
		font-size: 14px;
		margin-bottom: 12px;
		display: flex;
		flex-direction: column;
	}

	.versions-stats__row__stats {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 2fr;
		column-gap: 4px;
		text-align: right;
		padding-right: 10px;
	}

	.versions-stats__row__chart {
		width: 100%;
		text-align: right;
		line-height: 0;
	}

	.stats-time {
		color: #a3a3a3;
		text-align: right;
	}

	.stats-words {
		color: #a3a3a3;
		text-align: right;
	}
</style>
