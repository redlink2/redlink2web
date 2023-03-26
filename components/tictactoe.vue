<template>
	<div class="tic-tac-toe">
		<div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
			<div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell" @click="makeMove(rowIndex, cellIndex)">
				{{ cell }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	data() {
		return {
			grid: [
				['', '', '', ''],
				['', '', '', ''],
				['', '', '', ''],
				['', '', '', '']
			],
			currentPlayer: 'X',
			winner: null
		}
	},
	methods: {
		makeMove(rowIndex, cellIndex) {
			if (!this.grid[rowIndex][cellIndex] && !this.winner) {
				this.grid[rowIndex][cellIndex] = this.currentPlayer
				this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
				this.checkForWinner()
			}
		},
		checkForWinner() {
			// check rows
			for (let i = 0; i < 4; i++) {
				if (this.grid[i][0] !== '' && this.grid[i][0] === this.grid[i][1] && this.grid[i][1] === this.grid[i][2] && this.grid[i][2] === this.grid[i][3]) {
					this.winner = this.grid[i][0]
				return
				}
			}

			// check columns
			for (let j = 0; j < 4; j++) {
				if (this.grid[0][j] !== '' && this.grid[0][j] === this.grid[1][j] && this.grid[1][j] === this.grid[2][j] && this.grid[2][j] === this.grid[3][j]) {
					this.winner = this.grid[0][j]
				return
				}
			}

			// check diagonals
			if (this.grid[0][0] !== '' && this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2] && this.grid[2][2] === this.grid[3][3]) {
					this.winner = this.grid[0][0]
				return
			}

			if (this.grid[0][3] !== '' && this.grid[0][3] === this.grid[1][2] && this.grid[1][2] === this.grid[2][1] && this.grid[2][1] === this.grid[3][0]) {
					this.winner = this.grid[0][3]
				return
			}

			// check for tie
			if (!this.grid.some(row => row.includes(''))) {
					this.winner = 'tie'
				return
			}
		}
	}
}
</script>

<style>
	.row {
		display: flex;
	}

	.cell {
		flex: 1;
		padding: 1vw;
		text-align: center;
		cursor: pointer;
	}
</style>
