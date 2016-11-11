/*
Reading a writing files on computer
*/

var fs = require('fs');

// This is how you read a file
var readMe = fs.readFileSync('readMe.txt', 'utf8');

console.log(readMe);

// Write files
fs.writeFileSync('writeMe.txt', readMe);

// Async method
fs.readFile('readMe.txt', 'utf8', function (err, data) {
    fs.writeFile('writeMe.txt', data);
});
