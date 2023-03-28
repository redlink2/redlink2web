<template>
	<div>
		<h1>Your '90s/2000s Nostalgic Game</h1>
		<SimonGame />
	</div>
</template>

<script>
	import SimonGame from '~/components/simon.vue';

	export default {
		components: {
			SimonGame,
		},
	};
</script>