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
      label: req.body.name,
      value: '123'
    })
    var id = '';
    Master.createMaster(newMaster, function (err, master) {
      if (err) throw err;
      id = master._id
      console.log('id -->>',id)
      Master.updateMasterById(id, {value: id}, function (err, master){
        res.send(master).end()
      })
     // res.send(master).end()
    });
   

  })
  .put('/master/:id', function (req, res, next) {
    var objData = {
      name: req.body.name,
      label: req.body.name
    }
    Master.updateMasterById(req.params.id, objData, function (err, master){
      res.send(master)
    })
  })
  .delete('/master/:id', function (req, res, next) {
    Master.findByIdAndDelete(req.params.id, function(err, directory){
      if (err) throw err;
      res.send("ok");
    })
  })

module.exports = router;
