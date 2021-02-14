const winConditions = require('./winConditions');
const cases = [['Rock', 'Rock', 'Game is a draw!'],
               ['Rock','Paper', 'Player 2 wins!'],
               ['Rock','Scissors', 'Player 1 wins!'],
               ['Scissors', 'Paper', 'Player 1 wins!'],
               ['Scissors', 'Rock', 'Player 2 wins!'],
               ['Scissors', 'Scissors', 'Game is a draw!'],
               ['Paper', 'Rock', 'Player 1 wins!'],
               ['Paper', 'Paper', 'Game is a draw!'],
               ['Paper', 'Scissors', 'Player 2 wins!']];

describe("'winConditions utility", () => {
    test.each(cases)('Checks the proper win conditions for an RPS match.', (player1, player2, expected) => {
        const output = winConditions(player1, player2);
        expect(output).toEqual(expected);
    });
});
