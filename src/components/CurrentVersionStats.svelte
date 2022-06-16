<script>
	import { versions, currentVersion } from '$stores/versions';
	import { fmtReadTime } from '$utils/helpers';
</script>

<div class="version-stats__container">
	<div class="version-stats">
		<div class="version-stats__readability">
			<div class="value">{$versions[$currentVersion].readability}</div>
			<div>readability score</div>
		</div>
		<div class="version-stats__words"><span class="value">{$versions[$currentVersion].words} words</span></div>
		<div class="version-stats__sentences"><span class="value">{$versions[$currentVersion].sentences} sentences</span></div>
		<div class="version-stats__time"><span  class="value">{fmtReadTime($versions[$currentVersion].readTime)}</span> to read</div>
	</div>
</div>

<style>
	.version-stats__container {
		padding-left: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}

	.version-stats {
		border: 3px solid var(--color-accent);
		border-radius: 6px;

		position: sticky;
		top: 84px;

		color: #A3A3A3;
		font-size: 14px;
		line-height: 18px;
		padding: 14px 10px;
	}

	.version-stats__readability {
		margin-bottom: 10px;
	}
	.version-stats__readability .value {
		font-size: 24px;
		line-height: 24px;
	}

	.value {
		color: var(--toolbars-color);
	}
</style>
