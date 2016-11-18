/*  Partial Views/Templates  */

var express = require('express');

// Puts express into app so we can use it
var app = express();

app.set('view engine', 'ejs');

// Send server to assets folder when it requests the assets folder
app.use('/assets', express.static('assets'));

// When a req is made on / It will fire the function with a res.send
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

// We can use the name in the url to template to profile page
app.get('/profile/:name', function (req, res) {
    // Data to pass to the template
    var data = {
        age: 17,
        job: "Coder",
        hobbies: ['coding', 'gaming', 'more coding']
    };

    // render the template and send the necesarry data
    res.render('profile', {person: req.params.name, data: data});
});

app.listen(3000);
