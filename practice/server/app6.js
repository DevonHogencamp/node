/*
Send JSON to the Client
*/

var http = require('http');

var fs = require('fs');

// Create the server
// req: Handles requests from client
//res: We use it to send a response back to the client
var server = http.createServer(function (req, res) {
    // Displays on server what url the request is made on
    console.log('Request was made: ' + req.url);

    // Tells the browser what kind of data we are sending it
    res.writeHead(200, {'Content-Type':'application/json'});

    var myObj = {
        name: 'Devon',
        job: 'Coder',
        age: 17
    };

    // JSON.stringify makes it so the res.end will accept it
    res.end(JSON.stringify(myObj));
});

// Listen for requests from the port 3000
server.listen(3000, 'localhost');
console.log('Now listening to port 3000...');
