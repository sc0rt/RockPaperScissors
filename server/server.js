// TO DO: 
// fix it so when player refreshes the page, they don't become player 2 in game with inactive player

const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const {performance} = require('perf_hooks');
const RPSGame = require('./rpsGame');
const app = express();
const server = http.Server(app);

const clientPath = `${__dirname}/../static/`;
console.log(`Serving static from ${clientPath}`);

app.set('port', 5000);
app.use('/static', express.static(clientPath));

const io = socketIO(server);

var queuedPlayer = null; // initially set as null since there is no connected player

var t0 = performance.now();
io.on('connection', function(socket) {
    var t1 = performance.now();
    console.log("\nConnection time since startup: " + (t1 - t0) + " ms.");

    var t2 = performance.now();
    socket.emit('message', 'You have connected.');
    var t3 = performance.now();
    console.log("Connection message emit() time: " + (t3 - t2) + " ms.");

    // if there is a queued up player, then they can play with the one who connects next
    if (queuedPlayer) {
        // after importing the RPSGame logic into server.js at the top, it can then be constructed
        var t10 = performance.now();
        new RPSGame(queuedPlayer, socket);
        var t11 = performance.now();
        console.log("RPSGame object construction time: " + (t11 - t10) + " ms.");

        // since the game has started, reset the queue
        queuedPlayer = null;
    } else {
        //player has connected, but there is nobody in queue to play against. Then connected player is put into queue
        queuedPlayer = socket;
        queuedPlayer.emit('message', 'Please wait for an opponent.');
    }

    socket.on('message', function(text) {
        var t4 = performance.now();
        io.emit('message', text); // send to everyone connected
        var t5 = performance.now();
        console.log("IO message emit() time: " + (t5 - t4) + " ms.");
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
    console.log('RPS has started on port 5000.');
});
