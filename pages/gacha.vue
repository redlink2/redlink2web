<template>
	<div>
		<h1>Demo Page</h1>
		<button @click="fetchData">Fetch Data</button>
		<ul v-if="data">
			<li v-for="item in data" :key="item.ref.id">
				{{ item.data.name }} (Rarity: {{ item.data.rarity }})
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { query as q, Client } from 'faunadb';

const client = new Client({ secret: import.meta.env.FAUNADB_SECRET });

const data = ref([]);

async function fetchData() {
	try {
		const response = await fetch('/api/fauna', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: q.toString(q.Paginate(q.Match(q.Index('GachaPrizes_by_rarity_full_data')))),
			}),
		}).then((res) => res.json());

		data.value = response.result.data.map((row) => {
			const [rarity, id, name, type, habitat, region, description, ref] = row;
			return { data: { rarity, id, name, type, habitat, region, description }, ref };
		});
	} catch (error) {
		console.error('Error fetching data from FaunaDB:', error);
	}
}

</script>
