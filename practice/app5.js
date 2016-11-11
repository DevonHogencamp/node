/*
Create and remove directories
*/

var fs = require('fs');

// Deltes files
fs.unlink('writeMe.txt');

// Sync create directories
fs.mkdirSync('stuff');

// Sync remove directories
fs.rmdirSync('stuff');

// Async make directories
fs.mkdir('stuff', function () {
    fs.readFile('readMe.txt', 'utf8', function (err, data) {
        fs.writeFile('./stuff/writeMe.txt', data);
    });
});

// Async remove directories **You must remove the files in a directory before deleting it**
fs.unlink('./stuff/writeMe.txt', function () {
    fs.rmdir('stuff');
});
