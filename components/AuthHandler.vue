<template>
	<div>
		<h1>Authentication Handling Component</h1>
		<div v-if="!user">
			<p>Please log in to access the protected content.</p>
			<button @click="loginWithGitHub">Log In with GitHub</button>
		</div>
		<div v-else>
			<p>Welcome, {{ user.email }}!</p>
			<button @click="logout">Log Out</button>
		</div>
	</div>
</template>

<script>
	import { onMounted, onUnmounted } from "vue";

	export default {
		data() {
			return {
				user: null,
			};
		},
		mounted() {
			onMounted(() => {
				this.$supabase.auth.onAuthStateChange((event, session) => {
					if (event === "SIGNED_IN") {
						// User is signed in
						// Handle the authenticated session
						this.user = session.user;
					} else if (event === "SIGNED_OUT") {
						// User is signed out
						// Perform any necessary actions
						this.user = null;
					}
				});
			});

			onUnmounted(() => {
				this.$supabase.auth.removeAuthStateListener();
			});
		},
		methods: {
			async loginWithGitHub() {
				try {
					await this.$supabase.auth.signIn({
						provider: "github",
					});
				} catch (error) {
					console.error("Social login error:", error);
				}
			},
			async logout() {
				try {
					await this.$supabase.auth.signOut();
				} catch (error) {
					console.error("Logout error:", error);
				}
			},
		},
	};
</script>

<style scoped>
	button {
		padding: 8px 16px;
		margin-top: 16px;
	}
</style>
