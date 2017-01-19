var mongoClient = require('mongodb').MongoClient;
var database;

module.exports = {
    connect: function () {
        mongoClient.connect('mongodb://localhost:27017/twitter_notes', function (err, db) {
            if (err) {
                return console.log('Error: ' + err);
            }

            database = db;

            console.log('Connected to database!');
        });
    },
    connected: function () {
        console.log('Type of database is ' + (typeof database));
        return typeof database != 'undefined';
    },
    insertFriends: function (friends) {
        database.collection('friends').insert(friends, function (err) {
            if (err) {
                console.log('Could not insert friends in the database');
            }
        });
    }
};
