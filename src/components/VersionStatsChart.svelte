<script>
	import { scaleLinear } from 'd3-scale';
	import { versionsReadabilityExtent, versionsWordsExtent } from '$stores/versions';

	export let width = 126;
	export let height = 20;
	export let readability;
	export let words;

	$: scaleReadability = scaleLinear().domain($versionsReadabilityExtent).range([0, width]);
	$: scaleWords = scaleLinear().domain($versionsWordsExtent).range([0, width]);
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
	<rect
		class="readability-bar"
		x={0}
		y="0"
		height={height * 0.5}
		width={scaleReadability(readability)}
	/>
	<rect class="words-bar" x={0} y={height * 0.5} height={height * 0.5} width={scaleWords(words)} />
</svg>

<style>
	svg {
		background-color: transparent;
	}

	rect {
		transform: scale(-1, 1);
		transform-origin: center;
		transition: all 0.2s;
	}

	.readability-bar {
		fill: #171717;
	}

	.words-bar {
		fill: #a3a3a3;
	}
</style>
