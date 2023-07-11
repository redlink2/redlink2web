<template>
	<div>
		<Navbar v-if="showDesktopNavbar" />
		<NavbarMobile v-else />
		<NuxtPage />
	</div>
</template>

<script>
	import Navbar from "~/components/Navbar.vue";
	import NavbarMobile from "~/components/NavbarMobile.vue";

	export default {
		components: {
			Navbar,
			NavbarMobile,
		},
		computed: {
			showDesktopNavbar() {
				if (process.client) {
					return window.innerWidth >= 800;
					return true;
				}else {
					return false;
				}
			},
		},
	};
</script>

<style>
	html {
		scroll-behavior: smooth;
	}

	body {
		background-color: purple;
		margin: 0;
	}
</style>
