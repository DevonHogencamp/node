var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leaders = require('../models/leaders');

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

/* Route '/' */

leaderRouter
    .route('/')
    .all(function(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })

.get(function(req, res, next) {
    Leaders.find({}, function(req, res, next) {
        if(err) throw err;
        res.json(leader);
    });
})

.post(function(req, res, next) {
    Leaders.create(reg, body, function(err, leader){
        if(err) throw err;

        console.log('Leader created!');

        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added leader with leader id: ' + id);
    });
})

.delete(function(req, res, next) {
    Leaders.remove({}, function(){
        if (err) throw err;
        res.json(resp);
    });
});

/* Route '/:leaderId' */

leaderRouter
    .route('/:leaderId')
    .all(function(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })

.get(function(req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
        if(err) throw err;
        res.json(leader);
    });
})

.put(function (req, res, next) {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        }, function(err, leader) {
            if (err) throw err;
            res.json(leader);
        });
    })

.delete(function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;
