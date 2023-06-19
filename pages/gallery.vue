<template>
	<div class="container">
		<MasonryWall
			:items="images"
			:ssr-columns="1"
			:column-width="500"
			:gap="32"
		>
			<template #default="{ item, index }">
				<GalleryImages :image="item" v-if="images.length" />
			</template>
		</MasonryWall>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { Client, query as q } from "faunadb";
	// import gallery images component
	import GalleryImages from "../components/GalleryImages.vue";
	import MasonryWall from "@yeger/vue-masonry-wall";

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
		padding: 3vh;
		background-color: purple;
	}
</style>
