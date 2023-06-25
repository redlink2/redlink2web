<template>
	<div class="container">
		<MasonryWall
			:items="images"
			:ssr-columns="ssrColumns"
			:column-width="columnWidth"
			:gap="gap"
			:min-columns="minColumns"
			:max-columns="maxColumns"
		>
			<template #default="{ item, index }">
				<GalleryImages :image="item" v-if="images.length" />
			</template>
		</MasonryWall>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, computed } from "vue";
	import { Client, query as q } from "faunadb";
	// import gallery images component
	import GalleryImages from "../components/GalleryImages.vue";
	import MasonryWall from "@yeger/vue-masonry-wall";

	let images = ref([]);
	let ssrColumns = ref(1);
	let gap = ref(32);
	let minColumns = ref(2);
	let maxColumns = ref(5);
	let windowWidth = ref(0); // Initialize with 0

	const updateLayout = () => {
		// mobile
		if (windowWidth.value < 600) {
			ssrColumns.value = 2;
			columnWidth.value = 150;
			gap.value = 10;
			minColumns.value = 2;
		}
		// tablet
		else if (windowWidth.value < 900) {
			ssrColumns.value = 3;
			columnWidth.value = 200;
			gap.value = 20;
			minColumns.value = 3;
		}
		// desktop
		else {
			ssrColumns.value = 5;
			columnWidth.value = 500;
			gap.value = 32;
			minColumns.value = 5;
		}
	};

	const columnWidth = computed(() => {
		if (windowWidth.value < 600) {
			return 200;
		} else if (windowWidth.value < 900) {
			return 200;
		} else {
			return 500;
		}
	});

	onMounted(async () => {
		if (typeof window !== "undefined") {
			windowWidth.value = window.innerWidth;
			window.addEventListener("resize", () => {
				windowWidth.value = window.innerWidth;
				updateLayout();
			});
			updateLayout();
		}
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
		if (typeof window !== "undefined") {
			window.removeEventListener("resize", updateLayout);
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

	/* mobile layout */
	@media (max-width: 900px) {
		.container {
			padding: 0vh;
			padding-top: 1vh;
		}
	}
</style>
