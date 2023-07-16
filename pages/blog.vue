<template>
	<div>
		<h1>Blog</h1>
		<div v-if="loading">Loading...</div>
		<div v-else>
			<div v-for="post in blogPosts" :key="post.ref.value.id">
				<h2>{{ post.data.title }}</h2>
				<p>{{ post.data.content }}</p>
				<hr />
			</div>
		</div>
	</div>
</template>

<script>
	import { Client, query as q } from "faunadb";

	const client = new Client({ secret: import.meta.env.VITE_FAUNADB_KEY });

	export default {
		data() {
			return {
				loading: true,
				blogPosts: [],
			};
		},
		async mounted() {
			try {
				const response = await client.query(
					q.Map(
						q.Paginate(q.Documents(q.Collection("BlogPosts"))),
						q.Lambda((post) => q.Get(post))
					)
				);
				this.blogPosts = response.data;
				this.loading = false;
			} catch (error) {
				console.error("Error fetching blog posts:", error);
			}
		},
	};
</script>
