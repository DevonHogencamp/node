/*  Express  */

var express = require('express');

// Puts express into app so we can use it
var app = express();

// When a req is made on / It will fire the function with a res.send
app.get('/', function (req, res) {
    res.end("This is the Homepage");
});

app.get('/contact', function (req, res) {
    res.end("This is the Contact Page");
});

app.listen(3000);
