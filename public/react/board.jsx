var isBrowser = (typeof module === 'undefined');
var React, Card;

if(isBrowser) {
	React = window.React;
} else {
	React = require('react');
	Card = require('./card.jsx');
}

var Board = React.createClass({
	getInitialState: function() {
		return { board: this.props.board, newCard: "" };
	},

	componentDidMount: function() {
		var that = this;
		this.socket = io();
		this.socket.on('update board', function(board) {
			that.onBoardUpdated(board);
		});
	},

	addCard: function(evt) {
		this.state.board.cards.push({ text: this.state.newCard });
		this.state.newCard = "";
		this.updateBoard();
	},

	addLike: function(index) {
		this.state.board.cards[index].likes++;
		this.updateBoard();
	},

	updateBoard: function() {
		$.ajax({
			url: "/board/" + this.props.board._id,
			dataType: 'json',
			contentType: 'application/json',
			type: 'PUT',
			data: JSON.stringify(this.state.board)
			//,success: this.onBoardUpdated
		});
	},

	onBoardUpdated: function(board) {
		this.setState({ board: board, newCard: this.state.newCard });
	},

	onInput: function(evt) {
		this.setState({ board: this.state.board, newCard: evt.target.value});
	},

	render: function() {
		var i = 0;
		return (
			<div id="board">
				<h1>{this.state.board.topic}</h1>
				<div id="input">
					<textarea className="input" onChange={this.onInput} value={this.state.newCard}></textarea>
					<button className="btn btn-primary btnSubmit" onClick={this.addCard}>Submit</button>
				</div>
				<div id="cards">
					{ this.state.board.cards.map(function(result) {
						return <Card key={i++} data={result} onAddLike={this.addLike.bind(null, i-1)}/>;
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