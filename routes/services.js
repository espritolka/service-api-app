var express = require('express');
var router = express.Router();

var Service = require('../models/services')

router.get('/', function (req, res, next) {

  Service.getServices(function (err, services) {
    res.send(services)
  })

})
  .get('/service/:id', function (req, res, next) {
    res.send(req.params.id)
  })
  .post('/service', function (req, res, next) {

    var newService = new Service({
      name: req.body.name,
      label: req.body.name,
      price: req.body.price
    })

    Service.createService(newService, function (err, service) {
      if (err) throw err;
      res.send(service)
    });

  })
  .put('/service/:id', function (req, res, next) {
    Service.updateServiceById(req.params.id, req.body, function (err, service) {
      res.send(service)
    })
  })
  .delete('/service/:id', function (req, res, next) {
    Service.findByIdAndDelete(req.params.id, function(err, directory){
      if (err) throw err;
      res.send("ok");
    })
  })

module.exports = router;
