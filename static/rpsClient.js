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

const socket = io();

writeEvent("Let's play Rock Paper Scissors!");
socket.on('message', function(text) {
    writeEvent(text);
});

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);
