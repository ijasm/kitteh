'use strict';

function onConnect(socket) {
	require('./sockets/board.socket').register(socket);
}

module.exports = function(socketio) {
	socketio.on('connection', function(socket) {
		onConnect(socket);
	})
}