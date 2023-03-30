<template>
	<div>
		<p>loading...</p>
	</div>
</template>

<script>
	export default {
		beforeMount() {
			window.location.href = 'https://redlink2.com';
		},
	}
</script>