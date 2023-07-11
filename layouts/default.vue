<template>
	<div>
		<Navbar v-if="desktop" />
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
			desktop() {
				if (process.client) {
					return window.innerWidth >= 800;
					return false;
				}else {
					return true;
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
