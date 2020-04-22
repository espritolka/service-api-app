'use strict';

var express = require('express');
var router = express.Router();

var Directory = require('../models/directorys');

router.get('/:type', function (req, res, next) {

  var dirType = req.params.type;
  Directory.getDirectorys(dirType, function (err, directorys) {

    res.send(directorys);
  });
}).post('/:type', function (req, res, next) {

  var newDirectory = new Directory({
    type: req.params.type,
    key: req.body.key,
    label: req.body.label
  });

  Directory.createDirectory(newDirectory, function (err, directory) {
    if (err) throw err;

    res.send(directory);
  });
}).put('/:type/:id', function (req, res, next) {
  if (err) throw err;
  Directory.updateDirectoryById(req.params.id, req.body, function (err, directory) {
    res.send(directory);
  });
}).delete('/:type/:id', function (req, res, next) {
  Directory.findByIdAndDelete(req.params.id, function (err, directory) {
    if (err) throw err;
    res.send("ok");
  });
});

module.exports = router;