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

const writeEvent = function(text) {
    const parent = document.querySelector('#events')
    const element = document.createElement('li');
    element.innerHTML = text;
    parent.appendChild(element);
    parent.scrollTop = parent.scrollHeight - parent.clientHeight; // so chat can scroll down to the new messages
};

const onFormSubmit = function(event) {
    event.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    socket.emit('message', text);
};

// 3 event listeners for the 3 button choices on the html form
const addButtonListeners = function() {
    // array of the ids of the buttons on the html form, as well as the choices to be sent to the server
    ['Rock', 'Paper', 'Scissors'].forEach(function(id) {
        const button = document.getElementById(id);
        button.addEventListener('click', function() {
            imgp1.src = "img/" + id + "250.png";
            socket.emit('choice', id);
        });
    });
}

socket.on('opponentChose', function(id) {
    imgp2.src = "img/" + id + "250.png";
});

socket.on('message', function(text) {
    writeEvent(text);
});

function loopCanvas() {
    context.clearRect(0, 0, width, height);
    context.drawImage(imgp1, width/4, height/2, width/4, height/2);
    context.drawImage(imgp2, width - imgp2.width - width/4, height/2, width/4, height/2);
}

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);
addButtonListeners();
loopCanvas();
