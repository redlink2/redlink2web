<template>
	<div class="navbar">
		<nav>
			<nuxt-link class="nav-item" to="/">
				<div class="icon"></div>
				About
			</nuxt-link>
			<nuxt-link class="nav-item" to="/blog">
				<div class="icon"></div>
				Blog
			</nuxt-link>
			<nuxt-link class="nav-item" to="/">
				<div class="icon"></div>
				Home
			</nuxt-link>
			<nuxt-link class="nav-item" to="/gallery">
				<div class="icon"></div>
				Gallery
			</nuxt-link>
			<nuxt-link class="nav-item" to="/playground">
				<div class="icon"></div>
				Games
			</nuxt-link>
		</nav>
	</div>
</template>

<style scoped>
	.navbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: indigo;
		/* box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); */
		z-index: 100;
	}

	nav {
		display: flex;
		justify-content: space-evenly;
		padding: 1vh 0;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-decoration: none;
		color: white;
		font-size: 2vh;
	}

	.icon {
		width: 3vh;
		height: 3vh;
		margin-bottom: .5vh;
		background-color: black;
		border-radius: 50%;
	}
</style>
