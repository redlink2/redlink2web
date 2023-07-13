<template>
	<div>
		<Navbar v-if="showNavbar && desktop" />
		<NavbarMobile v-if="showNavbar && !desktop" />
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
		data() {
			return {
				showNavbar: false,
			};
		},
		computed: {
			desktop() {
				if (process.client) {
					return window.innerWidth >= 800;
				} else {
					return true;
				}
			},
		},
		mounted() {
			this.showNavbar = this.desktop || !this.desktop;
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
