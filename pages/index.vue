<template>
	<div>
		<main>
			<div class="container">
				<div
					v-for="(section, index) in sections"
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
	export default {
		data() {
			return {
				sections: [
					{
						name: "Games",
						path: "/games/games",
						image: "/pages/gallery/thumbs/shapes-in-red.png",
						description: "Play a game!",
					},
					{
						name: "Art Gallery",
						path: "/gallery",
						image: "/pages/gallery/thumbs/weird dude.png",
						description: "View some art!",
					},
					{
						name: "Blog",
						path: "/blog",
						image: "/pages/gallery/thumbs/weirdo.png",
						description: "Read my blog!",
					},
					{
						name: "Dummy",
						path: "/",
						image: "/pages/gallery/thumbs/OntoSomethingNewCurtain.png",
						description: "Test!",
					},
					{
						name: "Startpage",
						path: "/startpager",
						image: "/pages/gallery/thumbs/start.png",
						description: "My startpage!",
					},
					{
						name: "Collection",
						path: "/collection",
						image: "/pages/gallery/thumbs/OntoSomethingNewCurtain.png",
						description: "Visit your collection!",
					},
				],
			};
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
		cursor: url("/images/custom-cursor.png"), auto;
	}

	main {
		background-image: url("/pages/nostalgia.png");
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
		.container {
			background-size: 16vh;
		}

		.container {
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
