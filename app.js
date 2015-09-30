'use strict'

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var JSX = require('node-jsx').install();

// connect to database
mongoose.connect('mongodb://localhost/blah');

var app = express();

// set handlebars as template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

// set public as our static content dir
app.use('/', express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/board.route'));
app.use('/board', require('./routes/board.route'));

var server = require('http').createServer(app).listen(3000, function() {
	console.log('Server started: http://localhost:3000/');
});

var socketio = require('socket.io')(server);

require('./socket.js')(socketio);