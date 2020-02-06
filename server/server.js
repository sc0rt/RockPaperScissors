const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);

const clientPath = `${__dirname}/../static/`;
console.log(`Serving static from ${clientPath}`);


app.set('port',8080);
app.use('/static', express.static(clientPath));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '../index.html'));
});

// when an error occurs, call this function
server.on('error', function(err) {
    console.error('Server error: ', err);
});

// listen to port 8080 and call this function
server.listen(8080, function() {
    console.log('RPS has started on 8080');
});