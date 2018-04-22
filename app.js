var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

// Routing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./app/route")(app);

// Connecting to server on port 8081
var server = app.listen(8081, function () {
	console.log("Connected to the server");
});

// Connecting to mongodb database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:0123456789@ds157653.mlab.com:57653/user', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', function () {
	console.log("Connected to the database");
});
