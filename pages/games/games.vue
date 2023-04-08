<template>
	<div>
		<h1>Welcome to my website</h1>
		<ul>
			<li><nuxt-link to="/">Home</nuxt-link></li>
			<!-- tic-tac-toe -->
			<li><nuxt-link href="/games/tictactoe">Tic-Tac-Toe</nuxt-link></li>
			<!-- blackjack -->
			<li><nuxt-link to="/games/blackjack">Blackjack</nuxt-link></li>
			<!-- simon -->
			<li><nuxt-link href="/games/simon">Simon</nuxt-link></li>
			<!-- minesweeper -->
			<li><a href="#">Coming Soon</a></li>
			<!-- hangman -->
			<li><a href="#">Coming Soon</a></li>
		</ul>
	</div>
</template>
