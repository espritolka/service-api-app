var express = require('express');
var router = express.Router();

var Directory = require('../models/directorys')

router.get('/:type', function (req, res, next) {

    var dirType = req.params.type
    Directory.getDirectorys( dirType,function (err, directorys) {
   
        res.send(directorys)

  })
})
  
  .post('/:type', function (req, res, next) {

    var newDirectory = new Directory({
      type: req.params.type,
      value: req.body.value
    })

    Directory.createDirectory(newDirectory, function (err, directory) {
      if (err) throw err;
      res.send(directory).end()
    });

  })
  .put('/:type/:id', function (req, res, next) {
      console.log(req.params.type, req.body)
    Directory.updateDirectoryById(req.params.id, req.body, function (err, directory) {
      res.send(directory)
    })
  })

  .delete('/:type/:id', function (req, res, next) {
    res.send("i'm delete (No)");
  })

module.exports = router;
