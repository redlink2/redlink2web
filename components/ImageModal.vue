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
		width: 100vw;
		height: 100vh;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		position: relative;
		margin: 15vh auto;
		width: 80vw;
		max-width: 30vw;
	}

	.close {
		color: red;
		position: absolute;
		right: -2vw;
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
		max-height: 70vh;
		object-fit: contain;
		border-radius: 3vh;
	}
</style>
