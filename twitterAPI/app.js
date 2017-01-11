// All of our requires
var url = require('url');
var express = require('express');
var queryString = require('querystring');
var async = require('async');

// Require our seperate modules
var authenticator = require('./authenticator.js');
var config = require('./config.json');

// Set up express app
var app = express();

// Add cookie parser functionality to our app
app.use(require('cookie-parser')());

// This is handeled by our authenticator.js
app.get('/auth/twitter', authenticator.redirectToTwitterLogin);

app.get(url.parse(config.oauth_callback).path, function(req, res) {
    authenticator.authenticate(req, res, function(err) {
        if (err) {
            console.log(err);
            res.sendStatus(401);
        } else {
            res.send('Authentication Successful!');
        }
    });
});

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/tweet', function(req, res) {
    if (!req.cookies.access_token || !req.cookies.access_token_secret) {
        return res.sendStatus(401);
    }

    authenticator.post('https://api.twitter.com/1.1/statuses/update.json', req.cookies.access_token, req.cookies.access_token_secret, {
        status: 'This tweet was made using Node.JS 123456'
    }, function(error, data) {
        if (error) {
            return res.status(400).send(error);
        }
        res.send('Tweet Successful!');
    });
});

app.get('/search', function(req, res) {
    if (!req.cookies.access_token || !req.cookies.access_token_secret) {
        return res.sendStatus(401);
    }

    authenticator.get('https://api.twitter.com/1.1/search/tweets.json?' + queryString.stringify({q:'Trump'}), req.cookies.access_token, req.cookies.access_token_secret, function(error, data) {
        if (error) {
            return res.status(400).send(error);
        }
        res.send(data);
    });
});

app.get('/followers', function (req, res) {
    if (!req.cookies.access_token || !req.cookies.access_token_secret) {
        return res.sendStatus(401);
    }

    var url = 'https://api.twitter.com/1.1/friends/list.json';

    if (req.query.cursor) {
        url += '?' + queryString.stringify({cursor : req.query.cursor});
    }

    authenticator.get(url, req.cookies.access_token, req.cookies.access_token_secret, function(error, data) {
        if (error) {
            return res.status(400).send(error);
        }
        res.send(data);
    });
});

app.get('/allFriends', function (req, res) {
    async.waterfall([
        // Get Twitter friends and ID's
        function (cb) {

        },

        // Get Twitter friends data using ID's
        function (cb) {

        }
    ]);
});

app.listen(config.port, function() {
    console.log("Server running on port " + config.port);

    console.log('OAuth callback: ' + url.parse(config.oauth_callback).hostname + url.parse(config.oauth_callback).path);
});
