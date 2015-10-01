var isBrowser = (typeof module === 'undefined');
var React, Card;

if(isBrowser) {
	React = window.React;
} else {
	React = require('react');
	BoardCard = require('./boardCard.jsx');
}

var Board = React.createClass({
	getInitialState: function() {
		var board = this.props.board;
		board.cards.sort(function(a, b) {
			return b.likes - a.likes;
		});

		return board;
	},

	componentDidMount: function() {
		var that = this;
		this.socket = io();
		this.socket.on('update board', function(board) {
			that.onBoardUpdated(board);
		});
	},

	onBoardUpdated: function(board) {
		board.cards = this.sortCards(board.cards);
		this.setState(board);
	},

	sortCards: function(cards) {
		cards.sort(function(a, b) {
			return b.likes - a.likes;
		});

		return cards;
	},

	render: function() {
		var i = 0;
		var mostNumLikes = 0;
		
		this.state.cards.map(function(result) {
			if(result.likes > mostNumLikes) {
				mostNumLikes = result.likes;
			}
		});

		return (
			<div id="board">
				<h1 className="title">{this.state.topic}</h1>
				<div id="cards">
					{ this.state.cards.map(function(result) {
						return <BoardCard key={i++} data={result} mostLikes={mostNumLikes}/>;
					  }.bind(this))
					}
				</div>
			</div>
		);
	}
});

if(!isBrowser) {
	module.exports = Board;
}