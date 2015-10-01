var isBrowser = (typeof module === 'undefined');
var React = isBrowser ? window.React : require('react');

var UserCard = React.createClass({
	render: function() {
		return (
			<div className="card" onClick={this.props.onAddLike}>
				<div className="text">{this.props.data.text}</div>
				<div className="likes">{this.props.data.likes} likes</div>
			</div>
		);
	}
});


if(!isBrowser) {
	module.exports = UserCard;
}