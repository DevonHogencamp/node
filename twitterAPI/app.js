// All of our requires
var url = require('url');
var express = require('express');
var authenticator = require('./authenticator.js');
var config = require('./config.json');

var app = express();

// Add cookie parser functionality to our app
app.use(require('cookie-parser'));

// This is handeled by our authenticator.js
app.get('/auth/twitter', authenticator.redirectToTwitterLogin);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(config.port, function () {
    console.log("Server running on port " + config.port);
});
