// All of our requires
var url = require('url');
var express = require('express');
var authenticator = require('./authenticator.js');
var config = require('./config.json');

var app = express();

// Add cookie parser functionality to our app
app.use(require('cookie-parser')());

// This is handeled by our authenticator.js
app.get('/auth/twitter', authenticator.redirectToTwitterLogin);

app.get(url.parse(config.oauth_callback).path, function (req, res) {
    authenticator.authenticate(req, res, function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        }
        else {
            res.send('Authentication Successful!');
        }
    });
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(config.port, function () {
    console.log("Server running on port " + config.port);

    console.log('OAuth callback: ' + url.parse(config.oauth_callback).hostname + url.parse(config.oauth_callback).path);
});
