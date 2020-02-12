const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const RPSGame = require('./rpsGame');

const clientPath = `${__dirname}/../static/`;
console.log(`Serving static from ${clientPath}`);

app.set('port', 5000);
app.use('/static', express.static(clientPath));

const io = socketIO(server);

var queuedPlayer = null; //initially set as null since there is no connected player

io.on('connection', function(socket) {
    socket.emit('message', 'You have connected.');

    // if there is a queued up player, then they can play with the one who connects next
    if (queuedPlayer) {
        // after importing the RPSGame logic into server.js at the top, it can then be constructed
        new RPSGame(queuedPlayer, socket);

        // since the game has started, reset the queue
        queuedPlayer = null;
    } else {
        //player has connected, but there is nobody in queue to play against. Then connected player is put into queue
        queuedPlayer = socket;
        queuedPlayer.emit('message', 'You are now in queue.<br> Please wait for an opponent.');
    }

    socket.on('message', function(text) {
        io.emit('message', text); //send to everyone connected
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
    console.log('RPS has started on 5000');
});
