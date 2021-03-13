const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);

const clientPath = `${__dirname}/../static/`;
console.log(`Serving static from ${clientPath}`);

app.set('port', 5000);
app.use('/static', express.static(clientPath));

const io = socketIO(server);

io.on('connection', function(socket) {
    socket.emit('message', 'You have connected.');

    socket.on('message', function(text) {
        io.emit('message', text); // send to everyone connected
    });
});

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '../index.html'));
});

// when an error occurs, call this function
server.on('error', function(err) {
    console.error('Server error: ', err);
});

// listen to port 5000 and call this function
server.listen(5000, function() {
    console.log('RPS has started on port 5000');
});
