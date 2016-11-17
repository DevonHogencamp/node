/*  Express Route Params  */

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

app.get('/profile/:id', function (req, res) {
    res.send('You requested to see a profile with the id of ' + req.params.id);
});

app.get('/profile/:name', function (req, res) {
    res.send('You requested to see a profile with the name of ' + req.params.name);
});
app.listen(3000);
