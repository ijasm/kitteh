var isBrowser = (typeof module === 'undefined');
var React;

if(isBrowser) {
	React = window.React;
} else {
	React = require('react');
}

var Boards = React.createClass({
	getInitialState: function() {
		return { boards: this.props.boards };
	},

	createBoard: function() {
		console.log("create board: " + $("#inputTopic").val());
		$.ajax({
			url: "/board/",
			dataType: 'json',
			contentType: 'application/json',
			type: 'POST',
			data: JSON.stringify({
				topic: $("#inputTopic").val()
			})
			,success: this.onBoardCreated
		});
	},

	onBoardCreated: function(data) {
		this.setState({ boards: data.boards });
		window.open("/board/" + data.newBoard._id);
	},

	onCreateBoard: function() {
		console.log("on create board");
		$('#inputTopic').attr('autofocus','true');
	},

	render: function() {
		var i = 0;
		return (
			<div id="main">
				<h1 className="title">Boards</h1>
				<div id="boards">
					{ this.state.boards.map(function(result) {
					  	return <a href={"/board/" + result._id}><button key={i++} data={result} className="board">{result.topic}</button></a>;
					  }) 
					}
					<button id="btnNewBoard" className="board" data-toggle="modal" data-target="#myModal" onClick={this.onCreateBoard}>+ New Board</button>
				</div>

				<div className="modal fade" id="myModal" role="dialog">
				    <div className="modal-dialog">
				      	<div className="modal-content">
				      		<form action="createBoard" method="post">
					        	<div className="modal-header">
					          		<button type="button" className="close" data-dismiss="modal">&times;</button>
					          		<h4 className="modal-title">New Board</h4>
					        	</div>
					        	<div className="modal-body">
					          		Topic: 
					          		<p><input id="inputTopic" type="text" className="form-control" autofocus="true"></input></p>
					        	</div>
					        	<div className="modal-footer">
					          		<button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.createBoard}>Create Board</button>
					        	</div>
					        </form>
				    	</div>
				    </div>
				</div>
			</div>
		);
	}
});

if(!isBrowser) {
	module.exports = Boards;
}