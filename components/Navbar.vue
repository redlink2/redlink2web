<template>
	<div class="navbar">
		<div class="container">
			<nav class="nav">
				<nuxt-link class="logo" to="/">
					<img src="~assets/logo/redlink2.png" alt="Logo" />
				</nuxt-link>
				<div class="nav-links">
					<nuxt-link class="nav-link nav-link-blue" to="/games/games">Games</nuxt-link>
					<nuxt-link class="nav-link nav-link-red" to="/">Gallery</nuxt-link>
					<nuxt-link class="nav-link nav-link-green" to="/">Blog</nuxt-link>
					<nuxt-link class="nav-link nav-link-yellow" to="/">Contact</nuxt-link>
				</div>
			</nav>
		</div>
	</div>
</template>

<style>
body {
	margin: 0;
}

.navbar {
	position: sticky;
	top: 0;
	z-index: 50;
	background-color: black;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.container {
	max-width: 100vw;
	margin: 0 auto;
	padding: 0 1vw;
}

.nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1vh 0;
}

.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3vh;
	color: #fff;
	text-decoration: none;
}

.logo img {
	max-height: 4vh;
	max-width: 100%;
}

.nav-links {
	display: flex;
	gap: 2vw;
}

.nav-link {
	color: #fff;
	text-decoration: none;
	font-size: 2vh;
}

.nav-link:hover {
	text-decoration: underline;
}

.nav-link-blue:hover {
	color: rgb(20, 20, 177);
}

.nav-link-red:hover {
	color: rgb(255, 0, 0);
}

.nav-link-green:hover {
	color: rgb(0, 255, 0);
}

.nav-link-yellow:hover {
	color: rgb(255, 255, 0);
}

</style>
