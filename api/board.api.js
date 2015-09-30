'use strict';

var _ = require('lodash');
var board = require('../models/board.model');
var React = require('react');
var Board = require('../public/react/board.jsx')

module.exports = {
	index: function(req, res) {
		board.find({}, function(err, board) {

			board[0].cards.sort(function(a, b) {
				return new Date(b.createdOn) - new Date(a.createdOn);
			});

			var component = <Board board={board[0]}/>
			var markup = React.renderToString(component);
			res.render('board', { markup: markup, reactComponent: "<Board board={" + JSON.stringify(board[0]) + "}/>" });
		});
	},

	create: function(req, res) {},
	read: function(req, res) {},

	update: function(req, res) {

		board.findById(req.params.id, function(err, results) {
			if(err) {
				return; // handle error
			} 

			if(!results) {
				return res.sendStatus(404);
			}

			// console.log("Updating card...");

			// console.log("Before update: ");
			// console.log(results);

			// console.log("Updates: ");
			// console.log(req.body);

			_.extend(results, req.body);

			console.log("Updated card:");
			console.log(results);

			results.save(function (err) {
    			if(err) {
    				// handle error
    				console.log("id: " + req.params.id);
    				console.log(req.body);
    				console.log(err);
    				return res.sendStatus(404);
    			}

    			//results.cards.sort(function(a, b) {
				// 	return new Date(b.createdOn) - new Date(a.createdOn);
				// });

    			return res.status(200).json(results);
    			//return res.status(200);
			});
		});
	},

	delete: function(req, res) {}
}