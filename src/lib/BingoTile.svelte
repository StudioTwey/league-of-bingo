<script lang="ts">
	export let tile: {
		word: string;
		index: number;
		selected: boolean;
	};
	export let updateBoard: (index: number) => void;

	const { word, index, selected } = tile;

	let cn = selected;
</script>

<p
	class={`bingo-cell ${cn ? 'off' : 'on'}`}
	on:click={() => {
		if (index === 12) return;
		cn = !cn;
		updateBoard(index);
	}}
>
	<span>{word}</span>
</p>

<style>
	.bingo-cell {
		border: 1px solid black;
		color: black;
		height: 125px;
		width: 125px;
		margin: 0;
		display: grid;
		place-items: center;
		text-align: center;
		overflow: hidden;
		cursor: pointer;
		padding: 0 2px;
	}

	.on {
		background-color: white;
	}

	.off {
		background-color: #56c9ff;
	}
</style>
