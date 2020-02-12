class RPSGame {
    // could use arrays to clean this up
    // these players are the socket connections
    constructor(player1, player2) {
        this._player1 = player1;
        this._player2 = player2;

        this._player1Choice = null;
        this._player2Choice = null;

        // send messages to both players that the game has started when constructed
        this._sendPlayer1('Time to play Rock Paper Scissors!<br><br>');
        this._sendPlayer2('Time to play Rock Paper Scissors!<br><br>');

        // event listener for player1 choice
        this._player1.on('choice', (choice) => {
            this._onChoice1(choice);
        });

        // event listener for player1 choice
        this._player2.on('choice', (choice) => {
            this._onChoice2(choice);
        });
    }

    // send message to the player1
    _sendPlayer1(text) {
        this._player1.emit('message', text);
    }

    // send message to the player2
    _sendPlayer2(text) {
        this._player2.emit('message', text);
    }

    // feedback for players to know that their choice was registered
    _onChoice1(choice) {
        if (this._player1Choice == null) {
            this._player1Choice = choice;
            this._sendPlayer1(`You chose ${choice}.`);
        } else {
            this._sendPlayer1(`Your already chose ${this._player1Choice}.`);
        }

        this._endGame();
    }

    _onChoice2(choice) {
        if (this._player2Choice == null) {
            this._player2Choice = choice;
            this._sendPlayer2(`You chose ${choice}.`);
        } else {
            this._sendPlayer2(`Your already chose ${this._player2Choice}.`);
        }

        this._endGame();
    }

    _winConditions(choice1, choice2) {

        // Game is a draw
        if (choice1 == choice2) {
            this._sendPlayer1('Game is a draw!');
            this._sendPlayer2('Game is a draw!');
        }

        // Player1 wins --------------------------------------------------------------------------------------------------------------
        if ((choice1 + choice2 == 'RockScissors') || (choice1 + choice2 == 'PaperRock') || (choice1 + choice2 == 'ScissorsPaper')) {
            this._sendPlayer1('You win!');
            this._sendPlayer2('You lose!');
        }

        // Player2 wins
        if ((choice2 + choice1 == 'RockScissors') || (choice2 + choice1 == 'PaperRock') || (choice2 + choice1 == 'ScissorsPaper')) {
            this._sendPlayer2('You win!');
            this._sendPlayer1('You lose!');
        }

    }

    _endGame() {
        const choice1 = this._player1Choice;
        const choice2 = this._player2Choice;

        if (choice1 && choice2) {
            this._sendPlayer1(choice1 + ' vs ' + choice2 + ' : Game over!');
            this._sendPlayer2(choice2 + ' vs ' + choice1 + ' : Game over!');
            this._winConditions(choice1, choice2);

            this._player1Choice = null;
            this._player2Choice = null;

            this._sendPlayer1('Play again?<br><br>');
            this._sendPlayer2('Play again?<br><br>');
        }
    }
}

module.exports = RPSGame;
