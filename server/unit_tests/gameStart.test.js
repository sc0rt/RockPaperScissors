const gameStart = require('./gameStart');
const cases = [
    [true, true],
    [false, false],
    [true, true],
    [false, false],
    [true, true],
    [false, false],
    [true, true],
    [false, false],
    [true, true],
];

describe('Checks to see if the game will start properly.', () => {
    test.each(cases)('Game Start Test', (text, expected) => {
        const output = gameStart(text);
        expect(output).toEqual(expected);
    });
});
