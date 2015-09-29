var board = require('../models/board.model');

exports.register = function(socket) {
	board.schema.post('save', function(board) {
		board.cards.sort(function(a, b) {
			return new Date(b.createdOn) - new Date(a.createdOn);
		});

		socket.emit('update board', board);
	});
}