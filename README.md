# \~Redlink2Web~

Redlink2Web is a web application built with Nuxt.js. It features an image gallery and games like Simon and Tic Tac Toe. The application also interacts with a database, possibly FaunaDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Build and Deploy](#build-and-deploy)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project locally for the first time, follow these steps:

1. Clone the repository: `git clone https://github.com/redlink2/redlink2web.git`
2. Navigate to the project directory: `cd redlink2web`
3. Install the dependencies: `yarn install`

## Usage

To start the development server, run `yarn dev`.

## Build and Deploy

To build and run the project, follow these steps:

1. Build the application with `yarn build`.
2. If you have previously created a 'redlink2' process with pm2, delete it with `pm2 delete redlink2`. This step is optional and only needed if a 'redlink2' process already exists.
3. Start a new 'redlink2' process with `pm2 start --watch --name 'redlink2' ecosystem.config.js`.
This process is automated with a GitHub Actions workflow. For more details, see the [workflow file](.github/workflows/deploy.yml).

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes in your branch.
4. Submit a pull request.

Before contributing, please read the [contributing guide](CONTRIBUTING.md).

## License

[MIT](LICENSE)
