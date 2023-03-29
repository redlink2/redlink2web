<template>
	<div>
		<h1>Simon Says</h1>
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