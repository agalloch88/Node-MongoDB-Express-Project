const express = require('express');
const Campsite = require('../models/campsite');
// ^^ use this to import the Campsite model
const campsiteRouter = express.Router();

// remove .all and explicitly set status codes and endpoints, pass in next as initial argument of CRUD operation

campsiteRouter.route('/')
    // .all((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     next();
    // })
    .get((req, res, next) => {
        Campsite.find()
        .then(campsites => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsites);
        })
        .catch(err => next(err));
    })
    .post((req, res, next) => {
        Campsite.create(req.body)
        .then(campsite => {
            console.log('Campsite Created', campsite);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite);
        })
        // res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
        .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /campsites');
    })
    .delete((req, res, next) => {
        Campsite.deleteMany()
        .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err));
    });

// end of endpoint addings, chained by removing "app" and ('/campsites') route from param list and ending ;

campsiteRouter.route('/:campsiteId')
    // .all((req, res, next) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/plain');
    //     next();
    // })
    .get((req, res, next) => {
        Campsite.findById(req.params.campsiteId)
        .then(campsite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite);
        })
        .catch(err => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
    })
    .put((req, res, next) => {
        // res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
        // res.end(`Will update the campsite: ${req.body.name}
        //     with description: ${req.body.description}`);
        Campsite.findByIdAndUpdate(req.params.campsiteId, {
            $set: req.body
        }, { new: true})
        .then(campsite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite);
        })
        .catch(err => next(err));
    })
    .delete((req, res) => {
        Campsite.findByIdAndDelete(req.params.campsiteId)
        .then(response=> {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        })
        .catch(err => next(err));
    });

module.exports = campsiteRouter;