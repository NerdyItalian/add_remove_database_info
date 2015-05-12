var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Assignment = require('../models/assignment.js');

/* READ: GET data from database. */
router.get('/', function(req, res, next) {
        Assignment.find(function (err, data){
        if (err) return next("hey you have a GET error", err);
        res.json(data);
  });
});

/*CREATE: POST data to database*/
router.post('/', function(req, res, next){
    Assignment.create(req.body, function(err, postBackData){
        if (err) return next("hey you have a CREATE error", err);
        res.json(postBackData);
    });
});


/*UPDATE: Updates data to database*/

router.put('/:id', function(req, res, next){
    Assignment.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if (err) return next("hey you have a UPDATE error", err);
        res.json(post);
    });
});


/*DELETE: REMOVES data to database*/

router.delete('/:id', function (req, res, next){
    Assignment.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if (err) return next("hey you have a DELETE error", err);
        res.json(post);
    });
});


console.log('users.js loaded');

module.exports = router;