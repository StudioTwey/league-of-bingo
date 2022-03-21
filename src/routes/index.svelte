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
		let wordsToShuffle = shuffleArray(words.toString().trim().split('\n'));
		let bingoWords = wordsToShuffle.splice(0, 24);

		bingoWords.splice(12, 0, 'FREE');

		return bingoWords;
	}
</script>

<div class="container">
	<h1>League of Bingo</h1>
	{#await fetchData()}
		<p>Loading</p>
	{:then bingoWords}
		<div class="bingo-board">
			<h4>P</h4>
			<h4>R</h4>
			<h4>I</h4>
			<h4>C</h4>
			<h4>E</h4>
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
		background: rgb(9, 66, 104);
		padding: 0;
		margin: 0;
		font-family: 'Poppins', sans-serif;
	}

	h1 {
		color: white;
	}

	h4 {
		text-align: center;
		color: white;
		font-size: 1.6rem;
		font-weight: 400;
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
	}
</style>
