/*
Buffers and Streams
*/

/* Writeable string */
var http = require('http');

var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

// Every time a new chunk is received it is written to the writeMe.txt
myReadStream.on('data', function (chunk) {
    console.log('New chunk revieved');
    myWriteStream.write(chunk);
});
