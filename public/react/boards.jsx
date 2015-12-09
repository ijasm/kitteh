var isBrowser = (typeof module === 'undefined');
var React;

if(isBrowser) {
	React = window.React;
} else {
	React = require('react');
}

var Boards = React.createClass({
	render: function() {
		var i = 0;
		return (
			<div>
				<h1 className="title">Boards</h1>
				<div id="boards">
					{ this.props.boards.map(function(result) {
					  	return <a href={"/board/" + result._id}><div key={i++} data={result} className="board">{result.topic}</div></a>;
					  }) 
					}
				</div>
			</div>
		);
	}
});

if(!isBrowser) {
	module.exports = Boards;
}