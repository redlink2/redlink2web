module.exports = {
	apps: [
		{
			name: 'nostalgia', // Give your Nuxt3 app a unique name
			script: 'yarn', // Use 'npm' as the script to run
			args: 'start', // Pass 'run start' as the arguments
			env: {
				NODE_ENV: 'production', // Set the environment variable
				PORT: 4200
			},
			instances: 'max', // Use the maximum number of instances available
			exec_mode: 'cluster', // Run in cluster mode for better performance
		},
	],
};
