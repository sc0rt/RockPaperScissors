// TO DO : Fix the drawing to canvas functionality.
// If the opponent's choice is emitted to the socket, 
// might have to implement a feature that hides these choices from the user

const socket = io();
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
const context = canvas.getContext('2d');
var animation;
var degree; // degree of rotation for pre-game animation
var gameStart = false;
var imgP1 = document.createElement('img');
var imgP2 = document.createElement('img');
var rpsImg = document.createElement('img');
rpsImg.src = '../static/img/rps600.png';

/*------------------------------------------------- Chat setup -------------------------------------------------*/

// writing events into the chat box
const writeEvent = function(text) {
    const parent = document.querySelector('#events');
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

/*----------------------------------------------- Gameplay setup -----------------------------------------------*/

// 3 event listeners for the 3 button choices on the html form
const addButtonListeners = function() {
    // array of the ids of the buttons on the html form, as well as the choices to be sent to the server
    ['Rock', 'Paper', 'Scissors'].forEach(function(id) {
        const button = document.getElementById(id);
        button.addEventListener('click', function() {
            socket.emit('choice', id);
        });
    });
};

// Animation loop before the game start
function logoLoop() {
    degree = 0.5;
    context.clearRect(-rpsImg.width/2 - 100, -rpsImg.height/2 - 100, canvas.width, canvas.height);
    context.rotate(degree * Math.PI / 180);
    context.drawImage(rpsImg, -rpsImg.width/2, -rpsImg.height/2);
    animation = requestAnimationFrame(logoLoop);
}

// Main animation loop for the graphical parts of the game
function gameLoop() {
    animation = requestAnimationFrame(gameLoop);
}

/*------------------------------------------------ Execution -------------------------------------------------*/

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);
addButtonListeners();

if (!gameStart) {
    context.translate(canvas.width/2, canvas.height/2);
    logoLoop();
} else {
    gameLoop();
}
