<script lang="ts">
	import BingoTile from '$lib/BingoTile.svelte';

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}
	async function fetchData() {
		let res = await fetch(
			'https://raw.githubusercontent.com/StudioTwey/league-bingo/main/bingo.txt'
		);

		let words = await res.text();
		let wordsToShuffle = words.toString().split('\n').splice(0, 24);
		let bingoWords = shuffleArray(wordsToShuffle);

		bingoWords.splice(12, 0, 'FREE');

		return bingoWords;
	}
</script>

<h1>League of Bingo</h1>
<div class="container">
	{#await fetchData()}
		<p>Loading</p>
	{:then bingoWords}
		<div class="bingo-board">
			{#each bingoWords as word}
				<BingoTile {word} />
			{/each}
		</div>
	{:catch _err}
		<p>error</p>
	{/await}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap');
	:global(body) {
		background: #094268;
		padding: 0;
		margin: 0;
		font-family: 'Poppins', sans-serif;
	}

	h1 {
		text-align: center;
		color: white;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.bingo-board {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		max-width: 50%;
		border: 1px solid black;
	}
</style>
