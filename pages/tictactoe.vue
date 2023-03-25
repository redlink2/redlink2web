<template>
	<div class="game-container">
		<h1>Tic-Tac-Toe-Kinda</h1>
		<TicTacToe />
	</div>
</template>

<script>
	import TicTacToe from '~/components/tictactoe.vue'

	export default {
		components: {
			TicTacToe
		}
	}
</script>

<style>
	.game-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	h1 {
		margin-bottom: 30px;
	}

	.tic-tac-toe {
		display: flex;
		flex-wrap: wrap;
		width: 400px;
		height: 400px;
		border: 4px solid #333;
		border-radius: 20px;
		overflow: hidden;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 25%;
	}

	.cell {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		font-size: 80px;
		cursor: pointer;
		background-color: #fff;
		transition: all 0.2s ease-in-out;
	}

	.cell:hover {
		background-color: #eee;
	}

	.cell:hover > * {
		transform: scale(1.1);
	}

	.cell::before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		transform: rotate(45deg);
	}

	.cell.x::before,
	.cell.o::before,
	.cell.a::before {
		display: none;
	}

	.cell.x::after {
		content: 'X';
	}

	.cell.o::after {
		content: 'O';
	}

	.cell.a::after {
		content: '👽';
	}

	@media (max-width: 480px) {
		.tic-tac-toe {
			width: 90vw;
			height: 90vw;
		}

		.cell {
			font-size: 60px;
		}
	}
</style>