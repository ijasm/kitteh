var isBrowser = (typeof module === 'undefined');
var React = isBrowser ? window.React : require('react');

var BoardCard = React.createClass({
	getBarWidth: function() {
		var width = this.props.data.likes;

		if(this.props.mostLikes > 100) {
			width /= this.props.mostLikes;	
		}

		return width.toString() + "%";
	},

	render: function() {
		return (
			<div className="card" onClick={this.props.onAddLike}>
				<div className="bar" style={{"width" : this.getBarWidth()}}></div>
				<div className="text">{this.props.data.text}</div>
				<div className="txtLikes">{this.props.data.likes} likes</div>
			</div>
		);
	}
});

if(!isBrowser) {
	module.exports = BoardCard;
}