<script>
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	function spin(node, { duration }) {
		return {
			duration,
			css: (t) => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`;
			}
		};
	}
</script>

<div class="centered" in:spin={{ duration: 3000 }}>
	<h2>🎉🎉🎉BINGO🎉🎉🎉</h2>
</div>

<style>
	h2 {
		font-size: 6rem;
	}
</style>
