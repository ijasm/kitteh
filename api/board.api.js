'use strict';

var _ = require('lodash');
var board = require('../models/board.model');
var React = require('react');
var Board = require('../public/react/board.jsx');
var Boards = require('../public/react/boards.jsx');
var User = require('../public/react/user.jsx');

module.exports = {
	// just housing this here for the time being, because i can
	user: function(req, res) {
		board.find({}, function(err, board) {

			board[0].cards.sort(function(a, b) {
				return new Date(b.createdOn) - new Date(a.createdOn);
			});

			var component = <User board={board[0]}/>;
			var markup = React.renderToString(component);
			res.render('board', { markup: markup, reactComponent: "<User board={" + JSON.stringify(board[0]) + "}/>" });
		});
	},

	index: function(req, res) {
		board.find({}, function(err, boards) {
			var component = <Boards boards={boards}/>;
			var markup = React.renderToString(component);
			res.render('board', { markup: markup, reactComponent: "<Boards boards={" + JSON.stringify(boards) + "}/>" });
		});
	},

	create: function(req, res) {},

	read: function(req, res) {
		board.findById(req.params.id, function(err, result) {
			if(err) {
				return; // handle error
			} 

			if(!result) {
				return res.sendStatus(404);
			}

			var component = <Board board={result}/>;
			var markup = React.renderToString(component);
			res.render('board', { markup: markup, reactComponent: "<Board board={" + JSON.stringify(result) + "}/>" });
		});
	},

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