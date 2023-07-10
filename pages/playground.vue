<template>
	<div>
		<title class="title">Playground</title>
		<h1>Play a game!</h1>
		<ul>
			<!-- tic-tac-toe -->
			<li><nuxt-link href="/games/tictactoe">Tic-Tac-Toe</nuxt-link></li>
			<!-- blackjack -->
			<li><nuxt-link to="/games/blackjack">Blackjack</nuxt-link></li>
			<!-- simon -->
			<li><nuxt-link href="/games/simon">Simon</nuxt-link></li>
			<!-- minesweeper -->
			<li><a href="#" class="tba">Coming Soon</a></li>
			<!-- hangman -->
			<li><a href="#" class="tba">Coming Soon</a></li>
			<!-- home -->
			<li><nuxt-link to="/">Home</nuxt-link></li>
		</ul>
	</div>
</template>

<style scoped>
	li {
		margin-left: 3vw;
		font-size: 5vh;
	}
	a {
		text-decoration: none;
		color: blue;
	}
	a:hover {
		color: black;
	}
	a:visited {
		color: red;
	}
	a.tba {
		color: yellow;
	}
</style>
