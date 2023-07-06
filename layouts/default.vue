<template>
	<div>
		<title>Playground</title>
		<Navbar />
		<NuxtPage />
	</div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
	components: {
		Navbar
	}
}
</script>

<style>
body {
	margin: 0;
}
</style>
