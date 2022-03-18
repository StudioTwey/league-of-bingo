<script lang="ts">
	export let word;

	let cn = word === 'FREE' ? true : false;

	function toggleClass() {
		if (word === 'FREE') return;

		cn = !cn;
	}
</script>

<p class={`bingo-cell ${cn ? 'off' : 'on'}`} on:click={toggleClass}>
	<span>{word}</span>
</p>

<style>
	.bingo-cell {
		border: 1px solid black;
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
		background-color: #afec92;
	}
</style>
