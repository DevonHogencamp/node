console.log('Hello World');



// Waits 3 seconds before firing the function
setTimeout(function () {
    console.log('3 seconds have passed');
}, 3000);



// Counts the time of how many seconds have passed
var time = 0;

setInterval(function () {
    time += 2;
    console.log(time + ' seconds have passed');
}, 2000);



var time = 0;

var timer = setInterval(function () {
    time += 2;
    console.log(time + ' seconds have passed');
    if (time > 5) {
        clearInterval(timer);
    }
}, 2000);



console.log(__dirname);



console.log(__filename);



// Normal function statement

function sayHi() {
    console.log('Hi');
}

sayHi();



// Function expression

var sayBye = function () {
    console.log('Bye');
};

sayBye();



// Call a function within a function

function callFunction(fun) {
    fun();
}

callFunction(sayBye);
