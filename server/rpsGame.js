class RPSGame {
    // these players are the socket connections
    constructor(player1, player2) {
        this._player1 = player1;
        this._player2 = player2;

        this._player1Choice = null;
        this._player2Choice = null;

        // send messages to both players that the game has started when constructed
        this._sendPlayer1('Time to play Rock Paper Scissors!');
        this._sendPlayer2('Time to play Rock Paper Scissors!');

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
            this._sendPlayer1('Your choice was already made.');
        }

        this._endGame();
    }

    _onChoice2(choice) {
        if (this._player2Choice == null) {
            this._player2Choice = choice;
            this._sendPlayer2(`You chose ${choice}.`);
        } else {
            this._sendPlayer2('Your choice was already made.');
        }

        this._endGame();
    }

    _endGame() {
        const choice1 = this._player1Choice;
        const choice2 = this._player2Choice;

        if (choice1 && choice2) {
            this._sendPlayer1('Game over! ' + choice1 + ' vs ' + choice2);
            this._sendPlayer2('Game over! ' + choice2 + ' vs ' + choice1);

            this._player1Choice = null;
            this._player2Choice = null;

            this._sendPlayer1('Play again?');
            this._sendPlayer2('Play again?');
        }
    }
}

module.exports = RPSGame;
