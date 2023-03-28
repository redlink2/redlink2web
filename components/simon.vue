<template>
	<div class="game-container">
		<div class="shapes-container">
			<div
				v-for="(shape, index) in shapes"
				:key="index"
				:class="['shape', shape.type]"
				@click="playShape(index)"
			></div>
		</div>

		<div class="controls-container">
			<input type="range" min="1" max="10" v-model="playbackSpeed" />
			<button @click="toggleGameMode">Toggle Game Mode</button>
		</div>

		<div class="instructions-container">
			<p>Press Z, X, C, V to play shapes. Use arrow keys to control the slider, dial, and switch.</p>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	const shapes = [
		{ type: 'square', sound: 'square.mp3' },
		{ type: 'triangle', sound: 'triangle.mp3' },
		{ type: 'circle', sound: 'circle.mp3' },
		{ type: 'star', sound: 'star.mp3' },
	];

	const playbackSpeed = ref(5);

	function playShape(index) {
		console.log('Playing shape:', shapes[index]);
	}

	function toggleGameMode() {
		console.log('Toggling game mode');
	}
</script>

<style scoped>
	.game-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.shapes-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		margin-bottom: 30px;
	}

	.shape {
		width: 100px;
		height: 100px;
		cursor: pointer;
	}

	.square {
		background-color: red;
	}

	.triangle {
		background-color: blue;
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}

	.circle {
		background-color: green;
		border-radius: 50%;
	}

	.star {
		background-color: yellow;
		clip-path: polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 0% 35%, 39% 35%);
	}

	.controls-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 20px;
	}
</style>