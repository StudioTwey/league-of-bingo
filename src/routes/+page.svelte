<script lang="ts">
	import { onMount } from 'svelte';
	import BingoTile from '$lib/components/BingoTile.svelte';
	import WinningScreen from '$lib/components/WinningScreen.svelte';
	import {
		shuffleArray,
		checkHorizontralBingo,
		checkVerticalBingo,
		checkDiagonalBingo
	} from '$lib/bingo';

	let loading = true;
	let winningBoard = false;
	let bingoBoard: any[] = [];
	let storedBoard: null | string;

	async function fetchData() {
		const res = await fetch(
			'https://raw.githubusercontent.com/StudioTwey/league-bingo/main/bingo.json'
		);

		const words = await res.json();
		const mergedArray = Object.values(words).flat();

		const wordsToShuffle = shuffleArray(mergedArray);
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

<div class="flex flex-col items-center content-center absolute text-white m-auto w-full mt-12">
	<h1 class="text-2xl">League of Bingo</h1>
	{#if loading}
		<p>Loading...</p>
	{:else}
		{#if winningBoard}
			<WinningScreen />
		{/if}

		<div class="grid grid-cols-5">
			{#each 'PRICE' as letter}
				<h4 class="text-center text-lg font-bold">{letter}</h4>
			{/each}
			{#each bingoBoard as tile}
				<BingoTile {tile} {updateBoard} />
			{/each}
		</div>
		<!-- TODO: Style this -->
		<button class="mt-4" on:click={newBoard}>New Board</button>
	{/if}
</div>
