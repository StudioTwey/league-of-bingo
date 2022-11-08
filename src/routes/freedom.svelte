<script lang="ts">
	import { onMount } from 'svelte';
	let timeLeft: { days: number; hours: number; minutes: number; seconds: number } = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	function calculateTimeLeft() {
		const weekends = 1000 * 60 * 60 * 24 * 15;
		const difference = +new Date('2022-12-16') - +new Date() - weekends;

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}

		return timeLeft;
	}

	onMount(() => {
		timeLeft = calculateTimeLeft();
	});

	setInterval(() => {
		timeLeft = calculateTimeLeft();
	}, 1000);
</script>

<div class="container">
	<h1>Time Until Freedom</h1>
	<h3>
		{timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} mins {timeLeft.seconds} secs until
		freedom
	</h3>
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

	h3 {
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
