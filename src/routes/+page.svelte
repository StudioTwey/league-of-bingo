<script lang="ts">
	import { onMount } from 'svelte';
	import { shuffleArray } from '$lib/bingo';
	import BingoBoard from '$lib/components/BingoBoard.svelte';

	let loading = true;
	let bingoBoard: any[] = [];
	let exclusiveKeys: string[] = [];
	let inclusiveKeys: string[] = [];
	let formState: any = {
		game: ''
	};

	async function fetchData() {
		const res = await fetch(
			'https://raw.githubusercontent.com/StudioTwey/league-bingo/main/bingo.json'
		);
		const data = await res.json();

		exclusiveKeys = Object.keys(data.exclusive);
		console.log(exclusiveKeys);
		formState.game = exclusiveKeys[0];

		inclusiveKeys = Object.keys(data.inclusive);
		inclusiveKeys.forEach((key) => {
			formState[key] = false;
		});

		const wordsToShuffle = [
			...data.generic,
			...data.exclusive[formState.game],
			...inclusiveKeys
				.filter((key) => formState[key])
				.map((key) => data.inclusive[key])
				.flat()
		];

		const shuffledWords = shuffleArray(wordsToShuffle);
		let bingoWords = shuffledWords.splice(0, 24);

		bingoWords.splice(12, 0, 'FREE');

		return { bingoWords, exclusiveKeys, inclusiveKeys };
	}

	async function newBoard() {
		loading = true;
		bingoBoard = [];
		localStorage.clear();

		let data = await fetchData();
		data.bingoWords.forEach((word: string, index: number) => {
			bingoBoard.push({
				word,
				index,
				selected: index === 12 ? true : false
			});
		});
		localStorage.setItem('exclusiveKeys', JSON.stringify(data.exclusiveKeys));
		localStorage.setItem('inclusiveKeys', JSON.stringify(data.inclusiveKeys));
		localStorage.setItem('storedBoard', JSON.stringify(bingoBoard));
		loading = false;
	}

	onMount(() => {
		let storedBoard = localStorage.getItem('storedBoard');
		let storedExclusiveKeys = localStorage.getItem('exclusiveKeys');
		let storedInclusiveKeys = localStorage.getItem('inclusiveKeys');

		if (storedBoard === null) {
			newBoard();
		} else {
			bingoBoard = JSON.parse(storedBoard);
			// HACK: to lazy to fix this rn
			// @ts-ignore
			exclusiveKeys = JSON.parse(storedExclusiveKeys);
			// @ts-ignore
			inclusiveKeys = JSON.parse(storedInclusiveKeys);
			formState.game = exclusiveKeys[0];
			loading = false;
		}
	});
</script>

<div>
	<h1 class="text-white text-center text-2xl mt-2 relative">
		League of Bingo <span class="text-sm text-orange-400">beta</span>
	</h1>
</div>

<div class="flex flex-col items-center content-center m-auto w-full mt-2 relative">
	<div class="flex flex-col gap-2 w-[375px]">
		<p class="text-white text-xl">Select a game</p>
		<select bind:value={formState.game}>
			{#each exclusiveKeys as key}
				<option class="text-black" value={key}>{key}</option>
			{/each}
		</select>
		<div class="flex flex-row flex-wrap gap-2">
			{#each inclusiveKeys as key}
				<label for={key} class="text-white">
					<input type="checkbox" id={key} name={key} bind:checked={formState[key]} />
					{key}
				</label>
			{/each}
		</div>
		<button class="border-white border-2 text-black bg-white outline-none h-12" on:click={newBoard}
			>New Board</button
		>
	</div>

	{#if loading}
		<p>Loading...</p>
	{:else}
		<BingoBoard {bingoBoard} />
	{/if}
</div>
