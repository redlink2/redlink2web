<template>
	<div>
		<h1>Login</h1>
		<form @submit="loginWithEmail">
			<input type="email" v-model="email" placeholder="Email" required />
			<input
				type="password"
				v-model="password"
				placeholder="Password"
				required
			/>
			<button type="submit">Log In with Email</button>
		</form>
		<button @click="loginWithGitHub">Log In with GitHub</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				email: "",
				password: "",
			};
		},
		methods: {
			async loginWithEmail(event) {
				event.preventDefault();
				try {
					await this.$supabase.auth.signIn({
						email: this.email,
						password: this.password,
					});
				} catch (error) {
					console.error("Email login error:", error);
				}
			},
			async loginWithGitHub() {
				try {
					await this.$supabase.auth.signIn({
						provider: "github",
					});
				} catch (error) {
					console.error("Social login error:", error);
				}
			},
		},
	};
</script>
