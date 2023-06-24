<template>
	<div class="container">
		<MasonryWall
			:items="images"
			:ssr-columns="ssrColumns"
			:column-width="columnWidth"
			:gap="gap"
		>
			<template #default="{ item, index }">
				<GalleryImages :image="item" v-if="images.length" />
			</template>
		</MasonryWall>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from "vue";
	import { Client, query as q } from "faunadb";
	// import gallery images component
	import GalleryImages from "../components/GalleryImages.vue";
	import MasonryWall from "@yeger/vue-masonry-wall";

	let images = ref([]);
	let ssrColumns = ref(1);
	let columnWidth = ref(500);
	let gap = ref(32);

	const updateLayout = () => {
		// mobile
		if (window.innerWidth < 600) {
			ssrColumns.value = 1;
			columnWidth.value = 150;
			gap.value = 15;
		}
		// tablet
		else if (window.innerWidth < 900) {
			ssrColumns.value = 2;
			columnWidth.value = 150;
			gap.value = 10;
		}
		// desktop
		else {
			ssrColumns.value = 3;
			columnWidth.value = 500;
			gap.value = 32;
		}
	};

	onMounted(async () => {
		window.addEventListener("resize", updateLayout);
		updateLayout();
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

	onUnmounted(() => {
		window.removeEventListener("resize", updateLayout);
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

	/* mobile layout */
	@media (max-width: 900px) {
		.container {
			padding: 0vh;
			padding-top: 1vh;
		}
	}
</style>
