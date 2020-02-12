class Game {
	//Constructor
	constructor(One, Two) {
		this.players = [One, Two];
		this.choice = [null, null];
		this.msgTwo('Player 2 loaded');
		this.msgTwo('Round Start');
		this.players.forEach((player, no) => {
			player.on('turn', (turn) => { this.current(no, turn); });
		});
	}
	//Sends message to one player
	msgOne(playerNo, msg) {
		this.players[playerNo].emit('message', msg);
	}
	//Sends message to both players
	msgTwo(msg) {
		this.players.forEach((player) => {
			player.emit('message', msg);
		});
	}
	//Occurs after a choice is made
	current(playerNo, entry) {
		this.choice[playerNo] = entry;
		this.msgOne(playerNo, `You chose ${entry}`);
		this.endRound();
	}
	//Returns integer based on choice
	choiceCheck(entry) {
		switch (entry) {
			case 'rock':
				return 0;
			case 'paper':
				return 1;
			case 'scissors':
				return 2;
		}
	}
	//Compares integers to determine who won, calls previous function
	winCheck() {
		var x = this.choiceCheck(this.choice[0]);
		var y = this.choiceCheck(this.choice[1]);
		var calc = (x - y + 3) % 3;
		switch (calc) {
			case 0:
				this.msgTwo('Both players draw!');
			break;
			case 1:
				this.msgTwo('Player 1 wins!');
			break;
			case 2:
				this.msgTwo('Player 2 wins!');
			break;
		}
	}
	//Checks if both players made choice, if so calls previous function and starts a new round
	endRound() {
		var round = this.choice;
		if (round[0] && round[1]) {
			this.msgTwo('Player 1 chose ' + round.join(', Player 2 chose '));
			this.winCheck();
			this.choice = [null, null];
			this.msgTwo('Round Start');
		}
	}
}
module.exports = Game;

