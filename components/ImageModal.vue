<template>
	<div v-if="isOpen" class="modal" @click="close">
		<div class="modal-content" @click.stop>
			<span class="close" @click="close">&times;</span>
			<img :src="image.path" :alt="image.name" />
		</div>
	</div>
</template>

<script>
	export default {
		props: ["isOpen", "image"],
		methods: {
			close() {
				this.$emit("close");
			},
		},
	};
</script>

<style scoped>
	.modal {
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		position: relative;
		margin: 15vh auto;
		padding: 2vw;
		width: 80vw;
		max-width: 60vw;
		box-shadow: 0 0.5vh 1.5vh rgba(0, 0, 0, 0.5);
		background-color: #fff;
	}

	.close {
		position: absolute;
		right: 1vw;
		top: 1vw;
		color: #aaa;
		font-size: 2vw;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
