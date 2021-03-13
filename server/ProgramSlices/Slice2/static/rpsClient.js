const socket = io();

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

/*------------------------------------------------ Execution -------------------------------------------------*/

document.querySelector('#chatForm').addEventListener('submit', onFormSubmit);
