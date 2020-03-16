var express = require('express');
var router = express.Router();

var Master = require('../models/masters')

router.get('/', function (req, res, next) {

  Master.getMasters(function (err, masters) {
    res.send(masters)
  })

})
  .get('/master/:id', function (req, res, next) {
    res.send(req.params.id)
  })
  .post('/master', function (req, res, next) {

    var newMaster = new Master({
      name: req.body.name,
    })

    Master.createMaster(newMaster, function (err, master) {
      if (err) throw err;
      res.send(master).end()
    });

  })
  .put('/master/:id', function (req, res, next) {
    Master.updateMasterById(req.params.id, req.body, function (err, master){
      res.send(master)
    })
  })
  .delete('/master/:id', function (req, res, next) {
    res.send("i'm delete (No)");
  })

module.exports = router;
