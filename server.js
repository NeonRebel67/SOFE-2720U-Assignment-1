// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var Game = require('./static/game');
var client = null;

app.set('port', 5000);
app.use(express.static(`${__dirname}`));

// Routing
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
	console.log('Starting server on port 5000');
});

io.on('connection', function(socket) {
	if (client != null) {
		new Game(client, socket);
		client = null;
	} 
	else {
		client = socket;
		client.emit('message', 'Player 1 loaded');
	}
	socket.on('message', function(text) {
		io.emit('message', text);
	});
});
