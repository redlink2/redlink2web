<template>
	<div class="container">
		<div v-for="(image, index) in images" :key="index" class="grid-item">
			<div class="thumbnail" @click="openModal(image)">
				<img
					:src="image.path"
					:alt="image.name"
					class="thumbnail-image"
				/>
				<div class="thumbnail-hover">
					<p>{{ image.name }}</p>
				</div>
			</div>
		</div>
		<UModal v-model="showModal">
			<img :src="currentImage.path" :alt="currentImage.name" />
		</UModal>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { Client, query as q } from "faunadb";

	let images = ref([]);
	let showModal = ref(false);
	let currentImage = ref({});

	const openModal = (image) => {
		currentImage.value = image;
		showModal.value = true;
	};

	onMounted(async () => {
		const client = new Client({ secret: import.meta.env.VITE_FAUNADB_KEY });
		try {
			const result = await client.query(
				q.Map(
					q.Paginate(q.Documents(q.Collection("Images"))),
					q.Lambda((x) => q.Get(x))
				)
			);

			// Sort the images by aspect ratio
			images.value = result.data
				.map((item) => {
					const image = item.data;
					image.aspectRatio = image.width / image.height;
					return image;
				})
				.sort((a, b) => a.aspectRatio - b.aspectRatio);

			console.log("Fetched and sorted images:", images.value);
		} catch (error) {
			console.error("Error fetching images:", error);
		}
	});
</script>

<style scoped>
	html {
		scroll-behavior: smooth;
		background-repeat: repeat;
	}

	.container {
		background-color: purple;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-auto-rows: 20vh;
		grid-gap: 2vw;
	}

	.grid-item {
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

	@media (max-width: 50vw) {
		.container {
			grid-template-columns: repeat(3, 1fr);
		}

		.grid-item {
			height: 25vh;
			width: 50vw;
		}

		.thumbnail-hover {
			padding-bottom: 5vh;
		}
	}
</style>
