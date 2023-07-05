<template>
	<div>
		<main>
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
	import shapes from "@/assets/pages/gallery/thumbs/shapes.png";
	import ogre from "@/assets/pages/gallery/thumbs/ogre.png";
	import weirdo from "@/assets/pages/gallery/thumbs/weirdo.png";
	import newThing from "@/assets/pages/gallery/thumbs/newthing.png";
	import start from "@/assets/pages/gallery/thumbs/start.png";
	import desert from "@/assets/pages/gallery/thumbs/desert.png";

	export default {
		data() {
			return {
				sections: [
					{
						name: "Games",
						path: "/games/playground",
						image: shapes,
						description: "Play a game!",
					},
					{
						name: "Art Gallery",
						path: "/gallery",
						image: ogre,
						description: "View some art!",
					},
					{
						name: "Blog",
						path: "/blog",
						image: weirdo,
						description: "Read my blog!",
					},
					{
						name: "Dummy",
						path: "/",
						image: desert,
						description: "Test!",
					},
					{
						name: "Startpage",
						path: "/startpager",
						image: start,
						description: "My startpage!",
					},
					{
						name: "Collection",
						path: "/collection",
						image: newThing,
						description: "Visit your collection!",
					},
				],
			};
		},
		computed: {
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
	}

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
		gap: 2vw;
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
		main {
			min-height: 95vh; /* Change this line */
		}

		.container {
			background-size: 10vh;
			grid-template-columns: repeat(2, 1fr);
			gap: 3vh;
			padding-top: 3vh;
			padding-left: 5vw;
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
	}
</style>
