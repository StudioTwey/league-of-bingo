<script lang="ts">
	import { onMount } from 'svelte';
	import WinningScreen from '$lib/components/WinningScreen.svelte';
	import { shuffleArray } from '$lib/bingo';
	import BingoBoard from '$lib/components/BingoBoard.svelte';

	let loading = true;
	let winningBoard = false;
	let bingoBoard: any[] = [];
	let storedBoard: null | string;
	const inclusiveKeys = ['aubrey', 'kaeman'];
	const exclusiveKeys = ['league', 'tft', 'soulsLike'];

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
</script>

<h1 class="text-white text-center text-2xl">League of Bingo</h1>
<div class="flex flex-col items-center content-center absolute m-auto w-full mt-12">
	<form class="flex flex-col gap-4" on:submit={newBoard}>
		<p class="text-white">Select a game</p>
		<select>
			{#each exclusiveKeys as key}
				<option class="text-black" value={key}>{key}</option>
			{/each}
		</select>
		<div>
			{#each inclusiveKeys as key}
				<label for={key} class="text-white">
					<input type="checkbox" id={key} name={key} value={key} />
					{key}
				</label>
			{/each}
		</div>
		<button class="border-white border-2 text-black bg-white outline-none" type="submit"
			>New Board</button
		>
	</form>

	{#if loading}
		<p>Loading...</p>
	{:else}
		<BingoBoard {winningBoard} {bingoBoard} />
	{/if}
</div>

{#if winningBoard}
	<WinningScreen />
{/if}
