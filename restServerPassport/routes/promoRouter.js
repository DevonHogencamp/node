var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

/* Route '/' */

promoRouter
    .route('/')
    .all(function(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })

    .get(function(req, res, next) {
        Promos.find({}, function(req, res, next) {
            if(err) throw err;
            res.json(promo);
        });
    })

    .post(function(req, res, next) {
        Promos.create(reg, body, function(err, promo){
            if(err) throw err;

            console.log('Promo created!');

            var id = promo._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added promo with promo id: ' + id);
        });
    })

    .delete(function(req, res, next) {
        Promos.remove({}, function(){
            if (err) throw err;
            res.json(resp);
        });
    });
/* Route '/:promoId' */

promoRouter
    .route('/:promoId')
    .all(function(req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        next();
    })

    .get(function(req, res, next) {
        Promos.findById(req.params.promoId, function (err, promo) {
            if(err) throw err;
            res.json(promo);
        });
    })

    .put(function (req, res, next) {
            Promos.findByIdAndUpdate(req.params.promoId, {
                $set: req.body
            }, {
                new: true
            }, function(err, promo) {
                if (err) throw err;
                res.json(promo);
            });
        })

        .delete(function (req, res, next) {
            Promos.findByIdAndRemove(req.params.promoId, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
module.exports = promoRouter;
