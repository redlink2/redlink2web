<template>
	<header class="navbar">
		<h1 class="title">Redlink2's Playground</h1>
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
	export default {
		data() {
			return {
				isLoading: true,
				sections: [
					{ name: 'Games', path: '/games', image: '/pages/gallery/thumbs/shapes-in-red.png', description: 'Play fun 90s games!' },
					{ name: 'Art Gallery', path: '/gallery', image: '/pages/gallery/thumbs/weird dude.png', description: 'Explore amazing artwork.' },
					{ name: 'Blog', path: '/blog', image: '/pages/gallery/thumbs/weirdo.png', description: 'Read about interesting topics.' },
					{ name: 'Startpage', path: '/startpage', image: '/pages/gallery/thumbs/start.png', description: 'Your personalized startpage.' },
					{ name: 'Links', path: '/links', image: '/pages/gallery/thumbs/OntoSomethingNewCurtain.png', description: 'Discover other cool websites.' },
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
	body {
		background-image: url('/pulic/pages/wavy.png');
		background-repeat: repeat;
	}

	/* Title */
	.title {
		color: rgb(255, 0, 0);
		font-size: 5vh;
		font-family: 'Panic Sans', sans-serif;
	}

	/* Navbar */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 10vh;
		min-height: 50px;
		background-color: gray;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid black;
		z-index: 100;
	}

	.nav-item {
		color: rgb(255, 0, 0);
		margin: 0 1rem;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.nav-item:hover {
		color: rgb(0, 255, 0);
	}

	/* Main content */

	main {
		padding: 10vh;
	}
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 5vh;
		padding-top: 2rem;
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
		.title {
			font-size: 4vh;
		}

		.container {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		}

		.nav-item {
			margin: 0 0.5rem;
		}

		.thumbnail {
			height: 20vh;
			width: 50vw;
		}

		.thumbnail-hover {
			padding-bottom: 5vh;
		}
	}

	/* Custom Cursor */
	body {
		cursor: url('/images/custom-cursor.png'), auto;
	}

	body:hover .thumbnail {
		cursor: pointer;
	}

	/* Smooth Scroll */
	html {
		scroll-behavior: smooth;
	}
</style>