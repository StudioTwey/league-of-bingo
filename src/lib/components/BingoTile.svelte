<script lang="ts">
	export let tile: any;
	export let updateBoard: (index: number) => void;

	const { word, index, selected } = tile;

	let cn = selected;
</script>

<!-- TODO: FIX THIS -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<p
	class={`border border-black h-[125px] w-[125px] m-0 grid place-items-center text-center overflow-hidden cursor-pointer px-2 text-black ${
		cn ? 'bg-[#56c9ff]' : 'bg-white'
	}`}
	on:click={() => {
		if (index === 12) return;
		cn = !cn;
		updateBoard(index);
	}}
>
	<span>{word}</span>
</p>
