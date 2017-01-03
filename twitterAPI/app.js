// All of our requires
var express = require('express');
var app = express();

// Our port
var port = 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log("Server running on port " + port);
});
