var isBrowser = (typeof module === 'undefined');
var React, Card;

if(isBrowser) {
	React = window.React;
} else {
	React = require('react');
	UserCard = require('./userCard.jsx');
}

var User = React.createClass({
	getInitialState: function() {
		return { board: this.props.board, newCard: "", likedCards: [] };
	},

	componentDidMount: function() {
		this.state.likedCards = this.getLikedCardsFromCookie();
		this.setState(this.state);

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
		this.addCardToCookie(this.state.board.cards[index]._id);
		this.state.board.cards[index].likes++;
		this.updateBoard();
	},

	addCardToCookie: function(cardId) {
		this.state.likedCards.push(cardId);
		document.cookie = "likedCards=" + JSON.stringify(this.state.likedCards);
	},

	getLikedCardsFromCookie: function() {
		if(isBrowser) {
			var cookies = document.cookie.split(';');
			for(var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].split('=');

				if(cookie[0] == "likedCards") {
					return JSON.parse(cookie[1]);
				}
			}
		}
		return [];
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
		this.setState({ board: board, newCard: this.state.newCard, likedCards: this.state.likedCards });
	},

	onInput: function(evt) {
		this.setState({ board: this.state.board, newCard: evt.target.value, likedCards: this.state.likedCards });
	},

	render: function() {
		var i = 0;
		return (
			<div id="user">
				<h1 className="title">{this.state.board.topic}</h1>
				<div id="input">
					<textarea className="input" onChange={this.onInput} value={this.state.newCard}></textarea>
					<button className="btn btn-primary btnSubmit" onClick={this.addCard}>Submit</button>
				</div>
				<div id="cards">
					{ this.state.board.cards.map(function(result) {
						return <UserCard key={i++} data={result} onAddLike={this.addLike.bind(null, i-1)} liked={this.state.likedCards.indexOf(result._id) != -1}/>;
					  }.bind(this))
					}
				</div>
			</div>
		);
	}
});

if(!isBrowser) {
	module.exports = User;
}