<template>
	<title>Playground</title>
	<header class="navbar">
		<Navbar />
	</header>
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
				<img :src="section.image" :alt="section.name" class="thumbnail-image" />
				<div class="thumbnail-hover">
					<p>{{ section.description }}</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	import Navbar from '~/components/Navbar.vue';

	export default {
		data() {
			return {
				isLoading: true,
				sections: [
					{ name: 'Games', path: '/games/games', image: '/pages/gallery/thumbs/shapes-in-red.png', description: 'Play fun 90s games!' },
					{ name: 'Art Gallery', path: '/gallery', image: '/pages/gallery/thumbs/weird dude.png', description: 'Explore amazing artwork.' },
					{ name: 'Blog', path: '/blog', image: '/pages/gallery/thumbs/weirdo.png', description: 'Read about interesting topics.' },
					{ name: 'Startpage', path: '/startpager', image: '/pages/gallery/thumbs/start.png', description: 'My personalized startpage.' },
					{ name: 'Links', path: '/links', image: '/pages/gallery/thumbs/OntoSomethingNewCurtain.png', description: 'Discover other cool websites.' },
				],
			};
		},
		async fetch() {
			document.body.classList.add('main');
		},
		beforeUnmount() {
			document.body.classList.remove('main');
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
		cursor: url('/images/custom-cursor.png'), auto;
	}

	main {
		min-height: 80vh;
		margin: -.9vh;
		padding: 10vh;
		background-image: url('/pages/nostalgia.png');
		background-repeat: repeat;
	}

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 5vh;
		padding-top: 8vh;
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
		width: 100%;
		height: 100%;
		background-color: rgba(255, 0, 0, 0.5);
		opacity: 0;
		transition: opacity 0.3s ease;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding-bottom: 20vh;
	}

	.thumbnail {
		display: flex;
		align-items: center;
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}
	.thumbnail:hover .thumbnail-hover {
		opacity: 1;
	}

	/* Responsive Design */
	@media screen and (max-width: 768px) {
		main {
			background-size: 16vh;
		}

		.container {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			gap: 3vh;
			padding-top: 3vh;
			padding-left: 5vw;
		}

		.nav-item {
			margin: 0 0.5rem;
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