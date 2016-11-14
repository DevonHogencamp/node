var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

// Secret Code for later
app.use(cookieParser('12345-12345-12345-12345'));

function auth(req, res, next) {
    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization;

        if (!authHeader) {
            var err = new Error('Your are not authorized to be here!!');
            err.status =  401;
            next(err);
            return;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];

        if (user == 'admin' && pass == 'password') {
            res.cookie('user', 'admin', {signed: true});
            next();
        }
        else {
            var err = new Error('Your are not authenticated!!!');
            err.status = 401;
            next(err);
        }
    }

    else {
        if (req.signedCookies.user === 'admin') {
            next();
        }
        else {
            var err = new Error('Your are not authenticated!!!');
            err.status = 401;
            next(err);
        }
    }
}

app.use(auth);

app.use(express.static(__dirname + '/public/'));

app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});
