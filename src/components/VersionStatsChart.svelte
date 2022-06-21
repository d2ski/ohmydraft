<script>
	import { scaleLinear } from 'd3-scale';
	import { versionsWordsExtent } from '$stores/versions';

	export let width = 126;
	export let height = 20;
	export let words;

	$: scaleWords = scaleLinear().domain($versionsWordsExtent).range([0, width]);
</script>

<svg viewBox="0 0 {width} {height}">
	<line class="words-line" x1={0} y1={height} x2={scaleWords(words)} y2={height} />
</svg>

<style>
	svg {
		background-color: transparent;
	}

	line {
		transform: scale(-1, 1);
		transform-origin: center;
		transition: all 0.2s;
	}

	.words-line {
		stroke: #a3a3a3;
		stroke-width: 2px;
	}
</style>
