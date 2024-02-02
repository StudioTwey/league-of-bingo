<script lang="ts">
	import { checkHorizontralBingo, checkVerticalBingo, checkDiagonalBingo } from '$lib/bingo';
	import WinningScreen from './WinningScreen.svelte';
	export let bingoBoard: any[] = [];

	let winningBoard = false;

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
			winningBoard = true;
		}
	}
</script>

<div class="grid grid-cols-5 mt-4 relative">
	{#each 'PRICE' as letter}
		<h4 class="text-center text-white text-2xl font-bold">{letter}</h4>
	{/each}
	{#each bingoBoard as tile}
		<!-- TODO: FIX THIS -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<p
			class={`border border-black h-[125px] w-[125px] m-0 grid place-items-center text-center overflow-hidden cursor-pointer px-2 text-black ${
				tile.selected ? 'bg-[#56c9ff]' : 'bg-white'
			}`}
			on:click={() => {
				if (tile.index === 12) return;
				updateBoard(tile.index);
			}}
		>
			<span>{tile.word}</span>
		</p>
	{/each}
</div>

{#if winningBoard}
	<WinningScreen />
{/if}

