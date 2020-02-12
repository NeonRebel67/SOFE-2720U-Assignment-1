var socket = io();
//Gets the input from the buttons
var buttonInputs = function() {
	['rock', 'paper', 'scissors'].forEach(function(id) {
		var button = document.getElementById(id);
		button.addEventListener('click', function() {
			socket.emit('turn', id);
		});
	});
};
buttonInputs();
//Function for sending text output
var output = function(text) {
	var evMaj = document.querySelector('#output');
	var evMin = document.createElement('li');
	evMin.innerHTML = text;
	evMaj.appendChild(evMin);
};
output('Game Start');
socket.on('message', output);
document
  .querySelector('#chat-form')

