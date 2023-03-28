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
			for (let i = 0; i < 4; i++) {
				winningCells = this.checkRow(i);
				if (winningCells) {
					this.winner = this.grid[i][0];
					this.winningCells = winningCells;
					return;
				}
			}

			// check columns
			for (let j = 0; j < 4; j++) {
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
				this.winner = this.grid[0][0];
				this.winningCells = winningCells;
				return;
			}

			winningCells = this.checkDiagonal2();
			if (winningCells) {
				this.winner = this.grid[0][3];
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
			if (this.grid[row][0] !== '' && this.grid[row][0] === this.grid[row][1] && this.grid[row][1] === this.grid[row][2] && this.grid[row][2] === this.grid[row][3]) {
				return [[row, 0], [row, 1], [row, 2], [row, 3]];
			}
			return null;
		},
		checkColumn(col) {
			if (this.grid[0][col] !== '' && this.grid[0][col] === this.grid[1][col] && this.grid[1][col] === this.grid[2][col] && this.grid[2][col] === this.grid[3][col]) {
				return [[0, col], [1, col], [2, col], [3, col]];
			}
			return null;
		},
		checkDiagonal1() {
			if (this.grid[0][0] !== '' && this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2] && this.grid[2][2] === this.grid[3][3]) {
				return [[0, 0], [1, 1], [2, 2], [3, 3]];
			}
			return null;
		},
		checkDiagonal2() {
			if (this.grid[0][3] !== '' && this.grid[0][3] === this.grid[1][2] && this.grid[1][2] === this.grid[2][1] && this.grid[2][1] === this.grid[3][0]) {
				return [[0, 3], [1, 2], [2, 1], [3, 0]];
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