/*
Pipe HTML to Client
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
    res.writeHead(200, {'Content-Type':'text/html'});

    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');

    // Every time a new chunk is received it is outputed to the client
    myReadStream.pipe(res);
});

// Listen for requests from the port 3000
server.listen(3000, 'localhost');
console.log('Now listening to port 3000...');
