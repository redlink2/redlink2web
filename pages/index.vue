<template>
	<div>
		<main>
			<title class="title">~Home~</title>
			<div class="container">
				<div
					v-for="(section, index) in thumbs"
					:key="index"
					class="thumbnail"
					@click="goToSection(section.path)"
					tabindex="0"
					role="button"
					:aria-label="section.name"
				>
					<img
						:src="section.image"
						:alt="section.name"
						class="thumbnail-image"
					/>
					<div class="thumbnail-hover">
						<p>{{ section.description }}</p>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	// Import images
	import ogre from "@/assets/pages/gallery/thumbs/ogre.png";
	import shapes from "@/assets/pages/gallery/thumbs/shapes.png";
	import mirror from "@/assets/pages/gallery/thumbs/Mirror.png";
	import flower from "@/assets/pages/gallery/thumbs/FlowerGuy.png";

	export default {
		data() {
			return {
				sections: [
					// Games section
					{
						name: "Games",
						path: "/playground",
						image: shapes,
						description: "Play a game!",
					},
					// Gallery section
					{
						name: "Art Gallery",
						path: "/gallery",
						image: mirror,
						description: "View some art!",
					},
					// Blog section
					{
						name: "Blog",
						path: "/blog",
						image: flower,
						description: "Read my blog!",
					},
				],
			};
		},

		computed: {
			// Thumbnails
			thumbs() {
				return this.sections;
			},
		},

		methods: {
			goToSection(path) {
				this.$router.push(path);
			},
		},
	};
</script>

<style scoped>
	html {
		scroll-behavior: smooth;
		/* cursor: url("@/assets/images/custom-cursor.png"), auto; */
	}

	main {
		background-image: url("@/assets/pages/nostalgia.png");
		background-repeat: repeat;
		background-size: auto;
		background-position: center;
		height: 100vh;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		height: 90%;
		padding: 2vw;
	}

	/* Thumbnails */
	.thumbnail {
		height: 50vh;
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
		body {
			overflow: hidden;
		}

		main {
			background-size: 15vh;
			height: 100vh;
			display: flex;
			justify-content: center;
		}

		.container {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			height: 90vh;
		}

		.thumbnail {
			border: none;
			height: 20vh;
			width: 40vw;
			padding-bottom: 6vh;
		}

		.thumbnail-hover {
			padding-bottom: 5vh;
		}

		.thumbnail:nth-child(even) {
			margin-right: 25vw;
		}

		.thumbnail:nth-child(odd) {
			margin-left: 25vw;
		}
	}
</style>
