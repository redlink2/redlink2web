<template>
	<div>
		<main>
			<div class="container">
				<div
					v-for="image in images"
					:key="image.ref.id"
					class="thumbnail"
				>
					<img
						:src="image.data.path"
						:alt="image.data.name"
						class="thumbnail-image"
					/>
					<div class="thumbnail-hover">
						<p>{{ image.data.name }}</p>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { Client, query as q } from "faunadb";

	let images = ref([]); // using ref() to declare reactive variable

	onMounted(async () => {
		const client = new Client({ secret: import.meta.env.VITE_FAUNADB_KEY });
		try {
			const result = await client.query(
				q.Map(
					q.Paginate(q.Documents(q.Collection("Images"))),
					q.Lambda((x) => q.Get(x))
				)
			);
			images.value = result.data.map((item) => item.data); // parse the data field from each document
		} catch (error) {
			console.error("Error fetching images:", error);
		}
	});
</script>

<style scoped>
	html {
		scroll-behavior: smooth;
	}

	main {
		background-repeat: repeat;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
		gap: 2vw;
		padding: 2vw;
	}

	/* Thumbnails */
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
		.container {
			background-size: 16vh;
			grid-template-columns: repeat(auto-fit, minmax(15vw, 1fr));
			gap: 3vh;
			padding-top: 3vh;
			padding-left: 5vw;
		}

		.thumbnail {
			height: 25vh;
			width: 50vw;
		}

		.thumbnail-hover {
			padding-bottom: 5vh;
		}
	}
</style>
