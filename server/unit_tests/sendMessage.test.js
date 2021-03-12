const sendMessage = require('./sendMessage');
const cases = [
    ['Test 1', 'Test 1'],
    ['Test 2', 'Test 2'],
    ['Test 3', 'Test 3'],
    ['Test 4', 'Test 4'],
    ['Test 5', 'Test 5'],
    ['Test 6', 'Test 6'],
    ['Test 7', 'Test 7'],
    ['Test 8', 'Test 8'],
    ['Test 9', 'Test 9']
];

describe('Checks the messaging functionality.', () => {
    test.each(cases)('Send Message Test', (text, expected) => {
        const output = sendMessage(text);
        expect(output).toEqual(expected);
    });
});
