<script lang="ts">
	import { elasticOut } from 'svelte/easing';

	// TODO: Fix these types
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

<h2
	class="absolute text-8xl text-black top-1/2 flex flex-col"
	in:spin={{ duration: 3000 }}
>
	<span>🎉🎉🎉</span>
	BINGO!!
	<span>🎉🎉🎉</span>
</h2>

