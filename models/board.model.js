var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
	topic: String,
	cards: [{
		text: String,
		likes: {
			type: Number,
			default: 0
		},
		createdOn: {
			type: Date,
			default: Date.now
		}
	}]
});

module.exports = mongoose.model('Board', boardSchema);