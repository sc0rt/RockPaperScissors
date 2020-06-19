// TO DO : Fix the drawing to canvas functionality.
// If the opponent's choice is emitted to the socket, 
// might have to implement a feature that hides these choices from the user

const socket = io();
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');
var imgp1 = document.createElement('img');
var imgp2 = document.createElement('img');

// writing events into the chat box
const writeEvent = function(text) {
    const parent = document.querySelector('#events')
    const element = document.createElement('li');
    element.innerHTML = text;
    parent.appendChild(element);
    parent.scrollTop = parent.scrollHeight - parent.clientHeight; // so chat can scroll down to the new messages
};

// take the string value from the input on the chat form
const onFormSubmit = function(event) {
    event.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = ''; // reset the input value

    socket.emit('message', text);
};

// writing the input string value from the chat form to the event chat box
socket.on('message', function(text) {
    writeEvent(text);
});

// 3 event listeners for the 3 button choices on the html form
const addButtonListeners = function() {
    // array of the ids of the buttons on the html form, as well as the choices to be sent to the server
    ['Rock', 'Paper', 'Scissors'].forEach(function(id) {
        const button = document.getElementById(id);
        button.addEventListener('click', function() {
            socket.emit('choice', id);
        });
    });
}

// Main animation loop for the graphical parts of the game
function loopCanvas() {

}

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);
addButtonListeners();
loopCanvas();
