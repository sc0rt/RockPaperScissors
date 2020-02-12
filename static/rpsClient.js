const socket = io();
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d');

const writeEvent = function(text) {
    const parent = document.querySelector('#events')
    const element = document.createElement('li');
    element.innerHTML = text;
    parent.appendChild(element);
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
    ['rock', 'paper', 'scissors'].forEach(function(id) {
        const button = document.getElementById(id);
        button.addEventListener('click', function() {
            socket.emit('choice', id);
        });
    });
}

socket.on('message', function(text) {
    writeEvent(text);
});

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);

addButtonListeners();
