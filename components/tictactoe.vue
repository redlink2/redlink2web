<template>
	<div class="tic-tac-toe">
		<div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
    <div v-for="(cell, cellIndex) in row" :key="cellIndex" :style="{ backgroundColor: getBackgroundColor(cell, rowIndex, cellIndex) }" class="cell" @click="makeMove(rowIndex, cellIndex)">
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
			winner: null,
			winningCells: []
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
			let winningCells;

			// check rows
			for (let i = 0; i < 3; i++) {
				winningCells = this.checkRow(i);
				if (winningCells) {
					this.winner = this.grid[i][0];
					this.winningCells = winningCells;
					return;
				}
			}

			// check columns
			for (let j = 0; j < 3; j++) {
				winningCells = this.checkColumn(j);
				if (winningCells) {
					this.winner = this.grid[0][j];
					this.winningCells = winningCells;
					return;
				}
			}

			// check diagonals
			winningCells = this.checkDiagonal1();
			if (winningCells) {
				this.winner = this.grid[winningCells[0][0]][winningCells[0][1]];
				this.winningCells = winningCells;
				return;
			}

			winningCells = this.checkDiagonal2();
			if (winningCells) {
				this.winner = this.grid[winningCells[0][0]][winningCells[0][1]];
				this.winningCells = winningCells;
				return;
			}

			// check for tie
			if (!this.grid.some(row => row.includes(''))) {
				this.winner = 'tie';
				return;
			}
		},
		checkRow(row) {
			for (let i = 0; i < 2; i++) {
				if (this.grid[row][i] !== '' && this.grid[row][i] === this.grid[row][i + 1] && this.grid[row][i + 1] === this.grid[row][i + 2]) {
					return [[row, i], [row, i + 1], [row, i + 2]];
				}
			}
			return null;
		},
		checkColumn(col) {
			for (let i = 0; i < 2; i++) {
				if (this.grid[i][col] !== '' && this.grid[i][col] === this.grid[i + 1][col] && this.grid[i + 1][col] === this.grid[i + 2][col]) {
					return [[i, col], [i + 1, col], [i + 2, col]];
				}
			}
			return null;
		},

		checkDiagonal1() {
			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < 2; j++) {
					if (this.grid[i][j] !== '' && this.grid[i][j] === this.grid[i + 1][j + 1] && this.grid[i + 1][j + 1] === this.grid[i + 2][j + 2]) {
						return [[i, j], [i + 1, j + 1], [i + 2, j + 2]];
					}
				}
			}
			return null;
		},

		checkDiagonal2() {
			for (let i = 0; i < 2; i++) {
				for (let j = 3; j > 1; j--) {
					if (this.grid[i][j] !== '' && this.grid[i][j] === this.grid[i + 1][j - 1] && this.grid[i + 1][j - 1] === this.grid[i + 2][j - 2]) {
						return [[i, j], [i + 1, j - 1], [i + 2, j - 2]];
					}
				}
			}
			return null;
		},

		getBackgroundColor(cell, rowIndex, cellIndex) {
			if (this.winner === 'tie') {
				return 'gray';
			}

			if (this.winningCells.some(([row, col]) => row === rowIndex && col === cellIndex)) {
				return 'green';
			}

			if (cell === 'X') {
				return '#e60000';
			} else if (cell === 'O') {
				return '#00aaff';
			} else {
				return 'white';
			}
		},
	},
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