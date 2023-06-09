<template>
	<div class="blackjack">
		<h1>Blackjack</h1>
		<div class="dealer">
			<div class="dealer-score">
				Dealer: {{ handScore(dealerCards) }}
			</div>
			<div class="dealer-cards">
			<img
				v-for="(card, index) in dealerCards"
				:key="index"
				:src="getCardImagePath(card, index === 0 && !gameOver)"
				alt="Card"
				class="card"
			/>
			</div>
		</div>
		<div class="player">
			<div class="player-cards">
			<img
				v-for="(card, index) in playerCards"
				:key="index"
				:src="getCardImagePath(card)"
				alt="Card"
				class="card"
			/>
			</div>
			<div class="player-score">
				Player: {{ handScore(playerCards) }}
			</div>
		</div>
		<div class="wallet">
			Gems: ${{ wallet }}
		</div>
		<div class="bet">
			Bet: ${{ bet }}
		</div>
		<div class="controls">
			<button class="controls-button" v-if="gameOver" @click="resetGame">Play Again</button>
			<button class="controls-button" v-if="!gameOver" @click="decreaseBet">Decrease</button>
			<button class="controls-button" v-if="!gameOver" @click="increaseBet">Increase</button>
			<button class="controls-button" v-if="!gameOver" @click="hit">Hit</button>
			<button class="controls-button" v-if="!gameOver" @click="stay">Stay</button>
			<button class="controls-button" v-if="!gameOver" @click="">Help</button>
		</div>
		<div v-if="gameOver" class="game-result">{{ gameResult }}</div>
	</div>
</template>

<script>
	export default {
	data() {
		return {
			bet: 50,
			minBet: 50,
			maxBet: 500,
			wallet: 500,
			playerCards: [],
			dealerCards: [],
			gameOver: false,
			gameResult: "",
			deck: [],
			bettingOpen: true,
			win: null
		};
	},
	created() {
		this.resetGame();
	},
	methods: {
		getCardImagePath(card, isHidden = false) {
			if (isHidden) return import.meta.env.BASE_URL + 'pages/games/blackjack/hidden.png';
			return `${import.meta.env.BASE_URL}pages/games/blackjack/${card.suit}/${card.value}.png`;
		},
		createDeck() {
			const suits = ["club", "diamond", "heart", "spade"];
			const deck = [];
			suits.forEach((suit) => {
				for (let i = 0; i <= 12; i++) {
				deck.push({ value: i, suit });
				}
			});
			return deck;
		},
		shuffleDeck(deck) {
			for (let i = deck.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[deck[i], deck[j]] = [deck[j], deck[i]];
			}
		},
		dealInitialCards() {
			this.playerCards.push(this.deck.pop());
			this.playerCards.push(this.deck.pop());
			this.dealerCards.push(this.deck.pop());
			this.dealerCards.push(this.deck.pop());

			// check if the player has blackjack
			if (this.isBlackjack(this.playerCards)) {
				this.endGame("Player has Blackjack! Player wins!");
			}
		},
		cardScore(card) {
			if (card.value > 10) return 10;
			if (card.value === 0) return 11;
			return card.value + 1;
		},
		handScore(hand) {
			let score = hand.reduce((sum, card) => sum + this.cardScore(card), 0);
			let aces = hand.filter((card) => card.value === 1).length;

			while (score > 21 && aces > 0) {
				score -= 10;
				aces--;
			}

			return score;
		},
		hit() {
			this.playerCards.push(this.deck.pop());

			// check if the player has busted or has blackjack
			if (this.handScore(this.playerCards) > 21) {
				this.endGame("Player busts. Dealer wins!");
			} else if (this.handScore(this.playerCards) === 21) {
				this.endGame("Player has Blackjack! Player wins!");
			}

			if (this.bettingOpen === true) {
				this.bettingOpen = false;
			}
		},
		stay() {
			while (this.handScore(this.dealerCards) < 17) {
				this.dealerCards.push(this.deck.pop());
			}

			const playerScore = this.handScore(this.playerCards);
			const dealerScore = this.handScore(this.dealerCards);
			const playerBlackjack = this.isBlackjack(this.playerCards);
			const dealerBlackjack = this.isBlackjack(this.dealerCards);

			if (dealerScore > 21) {
				this.endGame("Dealer busts. Player wins!");
			} else if (dealerBlackjack && playerBlackjack) {
				this.endGame("Both have blackjack. It's a draw!");
			} else if (dealerBlackjack) {
				this.endGame("Dealer has blackjack. Dealer wins!");
			} else if (playerBlackjack) {
				this.endGame("Player has blackjack. Player wins!");
			} else if (dealerScore > playerScore) {
				this.endGame("Dealer wins!");
			} else if (dealerScore < playerScore) {
				this.endGame("Player wins!");
			} else {
				this.endGame("It's a draw!");
			}

			if (this.bettingOpen === true) {
				this.bettingOpen = false;
			}
		},
		increaseBet() {
			if (this.bettingOpen && this.bet < this.maxBet) {
				this.bet += 50;
			}
		},
		decreaseBet() {
			if (this.bettingOpen && this.bet > this.minBet) {
				this.bet -= 50;
			}
		},
		validateBet() {
			return this.bet >= this.minBet && this.bet <= this.maxBet;
		},
		updateWallet(isWin, isPush) {
			if (isWin) {
			if (this.isBlackjack(this.playerHand)) {
				this.wallet += this.bet * 1.5;
			} else {
				this.wallet += this.bet;
			}
			} else if (!isPush) {
			this.wallet -= this.bet;
			}
			this.maxBet = this.wallet;
		},
		isBlackjack(hand) {
			return (
				hand.length === 2 &&
				((hand[0].value === 0 && hand[1].value > 9) ||
					(hand[1].value === 0 && hand[0].value > 9))
			);
		},
		endGame(result) {
			this.gameOver = true;
			this.gameResult = result;
		},
		resetGame() {
			this.playerCards = [];
			this.dealerCards = [];
			this.deck = this.createDeck();
			this.shuffleDeck(this.deck);
			this.dealInitialCards();
			this.gameOver = false;
			this.gameResult = "";
			this.bettingOpen = true;
		},
	},
	};
</script>

<style scoped>
	.blackjack {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		max-width: 100vw;
		padding: 0.5rem;
	}

	.dealer,
	.player {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0.5rem;
		width: 100%
	}

	.dealer-cards,
	.player-cards {
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		max-width: 100%;
		overflow-x: auto;
	}

	.dealer-score,
	.player-score {
		margin: 0.25rem 0;
		font-size: 1.5rem;
	}
	.card {
		width: 8vw;
		height: auto;
		margin: 0.25rem;
		/* max-width: 50px;
		margin: 0 5px; */
	}
	@media (max-width: 768px) { /* Set the breakpoint at which the rule should apply */
		.card {
			width: 8vh; /* Change the width to 8vh for mobile devices */
		}
	}

	.controls {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
	}

	.control-button {
		margin: 0.25rem;
		padding: 0.75rem 1.5rem;
		font-size: 1.25rem;
		border: none;
		border-radius: 4px;
		background-color: #444;
		color: #fff;
		cursor: pointer;
	}

	.control-button:hover {
		background-color: #555;
	}

	.bet .wallet {
		margin-bottom: 20px;
	}
</style>
