/*
Routing diffrent requests
*/

var http = require('http');

var fs = require('fs');

// Create the server
// req: Handles requests from client
//res: We use it to send a response back to the client
var server = http.createServer(function (req, res) {
    // Displays on server what url the request is made on
    console.log('Request was made: ' + req.url);

    // If user req for the home page
    if (req.url === '/home' || req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        // Pipe the index.html to them
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }

    // If user req the contact page
    else if (req.url === '/contact') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        // Pipe the index.html to them
        fs.createReadStream(__dirname + '/contact.html').pipe(res);
    }

    // If the browser req ninjas api
    else if (req.url === '/api/ninjas') {
        // Send json
        var ninjas = [{name: 'Devon', age: 17}, {name: 'Mom', age: 'Young'}];

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(ninjas));
    }
    // If they req something that doesent exist
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});

        // Pipe the index.html to them
        fs.createReadStream(__dirname + '/404.html').pipe(res);
    }
});

// Listen for requests from the port 3000
server.listen(3000, 'localhost');
console.log('Now listening to port 3000...');
