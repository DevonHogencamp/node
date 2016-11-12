/*
Buffers and Streams
*/

/* Readable string */
var http = require('http');

var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');

myReadStream.on('data', function (chunk) {
    console.log('New chunk revieved');
    console.log(chunk);
});
