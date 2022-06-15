<script>
	import { versions, currentVersion } from '$stores/versions';

	const fmtReadTime = function (minutes) {
		if (minutes < 1) {
			return `${Math.round(minutes * 60)} sec read`;
		} else if (minutes < 60) {
			return `${Math.round(minutes)} min read`;
		} else {
			return `${Math.round(minutes / 60)} hrs read`;
		}
	};
</script>

<div class="version-stats__container">
	<table class="version-stats__table">
		<tr>
			<td>{fmtReadTime($versions[$currentVersion].readTime)}</td>
		</tr>
		<tr>
			<td>{$versions[$currentVersion].words} words</td>
		</tr>
		<tr>
			<td>{$versions[$currentVersion].readability} score</td>
		</tr>
	</table>
</div>

<style>
	.version-stats__container {
		padding-left: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}

	.version-stats__table {
		box-sizing: border-box;
		box-shadow: -3px -3px 0px 2px #d4d4d4;
		border-bottom: 2px solid #d4d4d4;
		border-right: 2px solid #d4d4d4;
		border-radius: 6px;

		position: sticky;
		top: 42px;

        color: #737373;
		font-size: 16px;
		padding: 0.8rem 0;
	}

	td {
		padding: 0 1rem;
	}
</style>
