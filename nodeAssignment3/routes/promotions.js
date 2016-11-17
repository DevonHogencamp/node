var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Verify = require('./verify');
var Promotions = require('./../models/promotions')

var promoRouter = express.Router()

promoRouter.use(bodyParser.json())

/* Route '/' */

promoRouter
    .route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Promotions.find({}, function(err, promotions) {
            assert.equal(err, null);
            res.json(promotions);
        });
    })

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotions.create(req.body, function(err, promotion) {
        assert.equal(err, null);
        res.json(promotion);
    })
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotions.remove({}, function(err, promotions) {
        assert.equal(err, null);
        res.json(promotions);
    })
});

/* Route '/:promoId' */

promoRouter
    .route('/:promoId')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Promotions.findById(req.params.promoId, function(err, promotion) {
        assert.equal(err, null);
        res.json(promotion);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    console.log(req.body);
    Promotions.findByIdAndUpdate(req.params.promoId, req.body, function(err, promotion) {
        assert.equal(err, null);
        res.json(promotion);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function(err, promotion) {
        assert.equal(err, null);
        res.json(promotion);
    });
});

module.exports = promoRouter;
