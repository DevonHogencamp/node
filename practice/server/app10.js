/*  Template Engines  */

var express = require('express');

// Puts express into app so we can use it
var app = express();

app.set('view engine', 'ejs');

// When a req is made on / It will fire the function with a res.send
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + '/contact.html');
});

app.get('/profile/:name', function (req, res) {
    var data = {
        age: 17,
        job: "Coder"
    };

    res.render('profile', {person: req.params.name, data: data});
});
app.listen(3000);
