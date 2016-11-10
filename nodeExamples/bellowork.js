// Blocking Code
var contents = fs.readFileSync('/etc/hosts');
console.log(contents);
console.log('Do something else');

// Non Blocking Code
fs.readFile('etc/hosts', function (err, contents) {
    console.log(contents);
});

// Or another way
function callback(err, contents) {
    console.log(contents);
}

// Both can be downloaded symotaniously
fs.readFile('etc/hosts', callback);
fs.readFile('etc/inetconfg', callback);


/*** hello.js ***/

// This is how we require modules
var http = require('http');

http.createServer(function (request, response) {
    // Status Code in header
    response.writeHead(200);

    // Response Body
    response.write("Hello this is dog");

    // Close the connection
    response.end();
}).listen(8080); // Listens for connections on port 8080

// Another way

http.createServer(function (request, response) {
    // Status Code in header
    response.writeHead(200);

    // Response Body
    response.write("Dog is running");

    setTimeout(function () {
        response.write("Dog is done");

        response.end();
    }, 5000); // 5 seconds

    // Close the connection
    response.end();
}).listen(8080); // Listens for connections on port 8080

console.log('Listening on port 8080...');

/*** This is what we need to do to run this script ***
// Run the server
node hello.js
---->Listening on port 8080...

curl http://localhost:8080
---->Hello this is dog
*/
