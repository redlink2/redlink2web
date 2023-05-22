// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	server: {
		port: 3000,
		host: '0.0.0.0',
	},
	head: {
		title: '~Nostalgia~',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	components: true,
	env: {
		FAUNADB_KEY: process.env.FAUNADB_KEY,
	},
})
