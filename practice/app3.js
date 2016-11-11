var events = require('events');
var util = require('util');

// Creates custom event
var myEmitter = new events.EventEmitter();

myEmitter.on('someEvent', function (msg) {
    console.log(msg);
});

myEmitter.emit('someEvent', "The event was emitted");


// Allows objects to inherit custom events
var Person = function (name) {
    this.name = name;
};

util.inherits(Person, events.EventEmitter);

var devon = new Person('Devon');
var nathan = new Person('Nathan');
var dad = new Person('James');

var people = [devon, nathan, dad];

people.forEach(function (person) {
    person.on('speak', function (msg) {
        console.log(person.name + " said " + msg);
    });
});

devon.emit('speak', "Im such a good coder!");

nathan.emit('speak', "Im good a basketball");
