function winConditions(choice1, choice2) {

    if (choice1 == choice2) {
        output = 'Game is a draw!';
    }

    if ((choice1 + choice2 == 'RockScissors') || (choice1 + choice2 == 'PaperRock') || (choice1 + choice2 == 'ScissorsPaper')) {
        output = 'Player 1 wins!';
    }

    if ((choice2 + choice1 == 'RockScissors') || (choice2 + choice1 == 'PaperRock') || (choice2 + choice1 == 'ScissorsPaper')) {
        output = 'Player 2 wins!';
    }

    return output
}

module.exports = winConditions