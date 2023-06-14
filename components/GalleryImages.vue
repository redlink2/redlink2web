<template>
	<div class="thumbnail">
		<img
			:src="image.path"
			:alt="image.name"
			class="thumbnail-image"
		/>

		<div class="thumbnail-hover">
			<p>{{ image.name }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			image: {
				type: Object,
				required: true,
			},
		},
	};
</script>

<style scoped>
	.thumbnail {
		border: 2px solid black;
		text-align: center;
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.thumbnail-image {
		width: 100%;
		height: 100%;
		transition: transform 0.3s ease;
		object-fit: cover;
	}

	.thumbnail:hover .thumbnail-image {
		transform: scale(1.1);
	}

	.thumbnail-hover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 0, 0, 0.5);
		opacity: 0;
		transition: opacity 0.3s ease;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.thumbnail:hover .thumbnail-hover {
		opacity: 1;
	}

	/* Responsive Design */
	@media screen and (max-width: 768px) {
		.thumbnail {
			height: 25vh;
			width: 50vw;
		}

		.thumbnail-hover {
			padding-bottom: 5vh;
		}
	}
</style>
