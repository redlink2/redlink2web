<template>
	<div v-if="isLoading" class="preloader">
		<img src="/images/preloader.gif" alt="Loading..." />
	</div>
	<header class="navbar">
		<nav>
			<nuxt-link to="/games" class="nav-item">Games</nuxt-link>
			<nuxt-link to="/startpage" class="nav-item">Startpage</nuxt-link>
			<!-- ... -->
		</nav>
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
				<h3>{{ section.name }}</h3>
				<p>{{ section.description }}</p>
			</div>
		</div>
    </div>
	</main>
	<footer class="footer">
		<div class="social-links">
			<a href="https://twitter.com/your_handle" target="_blank" rel="noopener noreferrer" class="social-link">Twitter</a>
			<a href="https://facebook.com/your_page" target="_blank" rel="noopener noreferrer" class="social-link">Facebook</a>
			<!-- ... -->
		</div>
	</footer>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				sections: [
					{ name: 'Games', path: '/games', image: '/images/games-thumbnail.png', description: 'Play fun 90s/2000s games!' },
					{ name: 'Startpage', path: '/startpage', image: '/images/startpage-thumbnail.png', description: 'Your personalized startpage.' },
					{ name: 'Art Gallery', path: '/art-gallery', image: '/images/art-gallery-thumbnail.png', description: 'Explore amazing artwork.' },
					{ name: 'Blog', path: '/blog', image: '/images/blog-thumbnail.png', description: 'Read about interesting topics.' },
					{ name: 'Links', path: '/links', image: '/images/links-thumbnail.png', description: 'Discover other cool websites.' },
				],
			};
		},
	mounted() {
		setTimeout(() => {
			this.isLoading = false;
		}, 3000); // Adjust the time as needed
	},
	methods: {
		goToSection(path) {
		this.$router.push(path);
		},
	},
};
</script>


<style scoped>
	/* Preloader */
	.preloader {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 9999;
	}

	/* Navbar */
	.navbar {
		/* Add your custom styles for the navbar */
	}

	.nav-item {
		/* Add your custom styles for the nav items */
	}

	/* Main content */
	.container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		padding: 2rem;
	}

	.thumbnail {
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.thumbnail-image {
		width: 100%;
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
		background-color: rgba(0, 0, 0, 0.5);
		opacity: 0;
		transition: opacity 0.3s ease;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.thumbnail {
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}
	.thumbnail:hover .thumbnail-hover {
		opacity: 1;
	}

	/* Footer */
	.footer {
		/* Add your custom styles for the footer */
	}

	.social-link {
		/* Add your custom styles for the social links */
	}

	/* Responsive Design */
	@media screen and (max-width: 768px) {
		.container {
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		}

		/* Add more responsive styles as needed */
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