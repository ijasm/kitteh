var isBrowser = (typeof module === 'undefined');
var React = isBrowser ? window.React : require('react');

var UserCard = React.createClass({
	render: function() {
		return (
			<div className="card">
				<div className="text">{this.props.data.text}</div>
				<button onClick={this.props.liked ? this.props.onRemoveLike : this.props.onLike}><i className={this.props.liked ? "fa fa-thumbs-up" : "fa fa-thumbs-o-up"}></i></button>
			</div>
		);
	}
});


if(!isBrowser) {
	module.exports = UserCard;
}