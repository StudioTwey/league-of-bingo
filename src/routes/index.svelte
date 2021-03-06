<script lang="ts">
	import { onMount } from 'svelte';
	import BingoTile from '$lib/BingoTile.svelte';
	import WinningScreen from '$lib/WinningScreen.svelte';
	import type { iBingoTile } from '../types';
	import {
		shuffleArray,
		checkHorizontralBingo,
		checkVerticalBingo,
		checkDiagonalBingo
	} from '../utils';

	let loading = true;
	let winningBoard = false;
	let bingoBoard: iBingoTile[] = [];
	let storedBoard: null | string;

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

	onMount(() => {
		storedBoard = localStorage.getItem('storedBoard');
		if (storedBoard === null) {
			fetchData().then((words) => {
				words.forEach((word: string, index: number) => {
					bingoBoard.push({
						word,
						index,
						selected: index === 12 ? true : false
					});
				});
				localStorage.setItem('storedBoard', JSON.stringify(bingoBoard));
				loading = false;
			});
		} else {
			bingoBoard = JSON.parse(storedBoard);
			loading = false;
		}
	});

	function updateBoard(index: number) {
		bingoBoard[index].selected = !bingoBoard[index].selected;
		checkBingo(index);
		localStorage.setItem('storedBoard', JSON.stringify(bingoBoard));
	}

	function checkBingo(index: number) {
		let row = Math.floor(index / 5);
		let col = index % 5;

		let rowBingo = checkHorizontralBingo(bingoBoard, row);
		let colBingo = checkVerticalBingo(bingoBoard, col);
		let diaBingo = checkDiagonalBingo(bingoBoard, row, col);

		if (rowBingo || colBingo || diaBingo) {
			console.log('Bingo');
			winningBoard = true;
			return true;
		}
		return false;
	}

	function newBoard() {
		loading = true;
		winningBoard = false;
		bingoBoard = [];
		localStorage.removeItem('storedBoard');

		fetchData().then((words) => {
			words.forEach((word: string, index: number) => {
				bingoBoard.push({
					word,
					index,
					selected: index === 12 ? true : false
				});
			});
			localStorage.setItem('storedBoard', JSON.stringify(bingoBoard));
			loading = false;
		});
	}
</script>

<div class="container">
	<h1>League of Bingo</h1>
	{#if loading}
		<p>Loading...</p>
	{:else}
		{#if winningBoard}
			<WinningScreen />
		{/if}

		<div class="bingo-board">
			<h4>P</h4>
			<h4>R</h4>
			<h4>I</h4>
			<h4>C</h4>
			<h4>E</h4>
			{#each bingoBoard as tile}
				<BingoTile {tile} {updateBoard} />
			{/each}
		</div>
		<button on:click={newBoard}>New Board</button>
	{/if}
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap');
	:global(body) {
		background: rgb(9, 66, 104);
		padding: 0;
		margin: 0;
		font-family: 'Poppins', sans-serif;
		color: white;
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

	button {
		margin-top: 1rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.bingo-board {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}
</style>
