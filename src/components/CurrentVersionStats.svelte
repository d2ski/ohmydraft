<script>
	import { versions, currentVersion } from '$stores/versions';
	import { fmtReadTime } from '$utils/helpers';

	$: ({words, sentences, readTime, readability} = $versions[$currentVersion]);
</script>

<div class="version-stats__container">
	<div class="version-stats">
		<div class="version-stats__readability">
			<div class="value">{readability ? readability : 0}</div>
			<div>readability</div>
		</div>
		<div class="version-stats__words"><span class="value">{words ? words : 0} words</span></div>
		<div class="version-stats__sentences"><span class="value">{sentences ? sentences.length : 0} sentences</span></div>
		<div class="version-stats__time"><span  class="value">{readTime ? fmtReadTime(readTime) : '0 sec'}</span> to read</div>
	</div>
</div>

<style>
	.version-stats__container {
		padding-left: 15px;
		position: sticky;
		top: 84px;
		
	}

	.version-stats {
		border: 3px solid var(--color-accent);
		border-radius: 6px;
		width: 126px;
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
