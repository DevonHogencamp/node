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

app.get('/friends', function (req, res) {
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
            var cursor = -1;

            var ids = [];

            console.log('1) IDs array length: ' + ids.length);

            async.whilst(
                function () {
                    return cursor != 0;
                },
                function (cb) {
                    authenticator.get('https://api.twitter.com/1.1/friends/ids.json?' + queryString.stringify({
                        user_id : req.cookies.twitter_id,
                        cursor : cursor
                    }), req.cookies.access_token, req.cookies.access_token_secret, function (error, data) {
                        if (error) {
                            return res.status(400).send(error);
                        }
                        data = JSON.parse(data);

                        cursor = data.next_cursor_str;

                        ids = ids.concat(data.ids);

                        cb();
                    });
                },
                function (error) {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    cb(null, ids);
                }
            );
        },

        // Get Twitter friends data using ID's
        function (ids, cb) {
            // Returns 100 IDs start from 100 + 1
            var getHundredthIds = function (i) {
                return ids.slice(100*i, Math.min(ids.length, 100*(i+1)));
            };
            var requestsNeeded = Math.ceil(ids.length/100);

            async.times(requestsNeeded, function (n, next) {
                var url = 'https://api.twitter.com/1.1/users/lookup.json?' + queryString.stringify({
                    user_id : getHundredthIds(n).join(' , ')
                });

                authenticator.get(url, req.cookies.access_token, req.cookies.access_token_secret, function (error, data) {
                    if (error) {
                        return res.status(400).send(error);
                    }
                    var friends = JSON.parse(data);
                    next(null, friends);
                });
            },
            function (err, friends) {
                // Flaten friends array
                friends = friends.reduce(function (previousValue, currentValue, currentIndex, array) {
                    return previousValue.concat(currentValue);
                }, []);

                // Sort the friends alphabetically by name
                friends.sort(function (a, b) {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
                res.send(friends);
                console.log('ids.length: ' + ids.length);
            });
        }   
    ]);
});

app.listen(config.port, function() {
    console.log("Server running on port " + config.port);

    console.log('OAuth callback: ' + url.parse(config.oauth_callback).hostname + url.parse(config.oauth_callback).path);
});
