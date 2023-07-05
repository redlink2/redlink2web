<template>
	<div class="container">
		<div v-for="column in columns" :key="column.id" class="column">
			<div v-for="image in column.images" :key="image.id" class="grid-item">
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
		</div>
		<image-modal
			:is-open="isModalOpen"
			:image="selectedImage"
			@close="closeModal"
		/>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { Client, query as q } from "faunadb";
	import ImageModal from "../components/ImageModal.vue";

	let images = ref([]);
	let isModalOpen = ref(false);
	let selectedImage = ref(null);
	let columns = ref([
		{ id: 1, images: [] },
		{ id: 2, images: [] },
		{ id: 3, images: [] },
		{ id: 4, images: [] },
		{ id: 5, images: [] },
	]);

	const openModal = (image) => {
		selectedImage.value = image;
		isModalOpen.value = true;
	};

	const closeModal = () => {
		isModalOpen.value = false;
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
				// .sort((a, b) => a.aspectRatio - b.aspectRatio);

			console.log("Fetched and sorted images:", images.value);
		} catch (error) {
			console.error("Error fetching images:", error);
		}
		// Distribute images across columns
		images.value.forEach((image, index) => {
			const columnIndex = index % columns.value.length;
			columns.value[columnIndex].images.push(image);
		});
	});
</script>

<style scoped>
	.container {
		background-color: purple;
		column-count: 5;
		column-gap: 1em;
	}

	.grid-item {
		/* border: 2px solid black; */
		text-align: center;
		cursor: pointer;
		break-inside: avoid;
		padding: 1em;
		margin-bottom: 3vh;
		box-sizing: border-box;
		width: 100%;
	}

	.thumbnail-image {
		width: 100%;
		height: auto;
	}

	/* Mobile styles */
	@media (max-width: 600px) {
		.container {
			padding-top: 1vh;
			column-count: 3;
		}

		.grid-item {
			padding: 0.4vh;
			margin-bottom: 1vh;
		}

		.thumbnail-hover {
			display: none;
		}
	}
</style>
