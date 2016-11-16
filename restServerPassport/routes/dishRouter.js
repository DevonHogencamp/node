var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dishes = require('../models/dishes');

var dishRouter = express.Router();

var Verify = require('./verify');

dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.find({}, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })
    .post(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.create(req.body, function(err, dish) {
            if (err) throw err;
            console.log('Dish created!');
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the dish with id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
        Dishes.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
dishRouter.route('/:dishId')
    .get(function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })
    .put(function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            console.log('Dish found!');

            Dishes.update({
                _id: dish._id
            }, req.body, function(err, updatedDish) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Updated the dish with id: ' + dish._id);
            });
        });
    })
    .delete(function(req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish) {
            dish.remove();

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Removed the dish with dish id: ' + dish._id);
        });
    });

module.exports = dishRouter;
