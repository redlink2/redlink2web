<template>
	<div>
		<main>
			<div class="container">
				<GalleryImages
					v-for="(image, index) in images"
					:key="index"
					:image="image"
					v-if="images.length"
				/>
			</div>
		</main>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { Client, query as q } from "faunadb";
	// import gallery images component
	import GalleryImages from "../components/GalleryImages.vue";

	let images = ref([]);

	onMounted(async () => {
		const client = new Client({ secret: import.meta.env.VITE_FAUNADB_KEY });
		try {
			const result = await client.query(
				q.Map(
					q.Paginate(q.Documents(q.Collection("Images"))),
					q.Lambda((x) => q.Get(x))
				)
			);
			images.value = result.data.map((item) => item.data);
			console.log(
				"Fetched images:",
				result.data.map((item) => item.data)
			);
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
		background-color: purple;
		background-repeat: repeat;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
		gap: 2vw;
		padding: 2vw;
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
	}
</style>
