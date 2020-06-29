const socket = io();
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
const context = canvas.getContext('2d');
var animation;
var degree; // degree of rotation for pre-game animation
var gameStart = false;
display = true;
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
            imgP1.src = '../static/img/' + id + '250.png';
            socket.emit('choice', id);
            gameStart = true;
        });
    });
};

socket.on('opponentChose', function(choice) {
    imgP2.src = '../static/img/' + choice + 'Flipped250.png';
});

socket.on('show', function() {
    display = true;
});

socket.on('hide', function() {
    display = false;
});

// Animation loop before the game start
function logoLoop() {
    if (gameStart) {
        context.resetTransform();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.resetTransform();
        gameLoop();
    } else {
        degree = 0.5;
        context.clearRect(-rpsImg.width/2 - 100, -rpsImg.height/2 - 100, canvas.width, canvas.height);
        context.rotate(degree * Math.PI / 180);
        context.drawImage(rpsImg, -rpsImg.width/2 - 20, -rpsImg.height/2 + 35);
        animation = requestAnimationFrame(logoLoop);
    }
}

function displayChoices() {
    if (display == true) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imgP1, canvas.width / 8, (canvas.height / 2) - (imgP1.height / 2));
        context.drawImage(imgP2, canvas.width / 8 + 350, (canvas.height / 2) - (imgP2.height / 2));
    } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Main animation loop for the graphical parts of the game
function gameLoop() {
    displayChoices();

    animation = requestAnimationFrame(gameLoop);
}

/*------------------------------------------------ Execution -------------------------------------------------*/

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);
addButtonListeners();

context.translate(canvas.width/2, canvas.height/2);
logoLoop(); // runs the logo rotation loop. once R P or S is chosen, gameStart becomes true and the gameLoop executes
