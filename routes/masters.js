var express = require('express');
var router = express.Router();

var Master = require('../models/masters')

router.get('/', function (req, res, next) {

  Master.getMasters(function (err, masters) {
    res.send(masters)
  })

})
  .get('/master/:id', function (req, res, next) {
    res.send(id)
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
    // res.send(handlers.update)
  })
  .delete('/master/:id', function (req, res, next) {
    //res.send(handlers.remove)
  })

module.exports = router;
