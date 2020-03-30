var express = require('express');
var router = express.Router();

var Register = require('../models/registers');
var Schedule = require('../models/schedules')

router.get('/', function (req, res, next) {
    Register.getRegisters(function (err, register) {
    res.send(register)
  })

})
  .get('/register/:id', function (req, res, next) {
    res.send(req.params.id)
  })
  .post('/register', function (req, res, next) {

      let newRegister = new Register({
        service: req.body.service,
        schedule: req.body.schedule,
        client: req.body.client
      })
      Register.createRegister(newRegister, function (err, register) {
        if (err) throw err;
        var data = {
            free: false,
            register: register
        }

        Schedule.updateSchedulesById(req.body.schedule._id, data, function(err, schedule){
           if(err){
               Register.deleteRegisterById(register._id, function(err, reg){
                   if (err) throw err;
                   res.status(422).send('Ошибка добавления записи').end
                  }
                )
           } else {
            res.send(register).end()
           }  
        }
        )
      });
  })
  .put('/register/:id', function (req, res, next) {
    Register.updateRegisterById(req.params.id, req.body, function (err, register) {
      res.send(register)
    })
  })
  .delete('/register/:id', function (req, res, next) {
 
        Register.findByIdAndDelete(req.params.id, function(err, register){
          if (err) throw err;

          var data = {
            free: true,
            register: {}
          }
          Schedule.updateSchedulesById(req.params.id, data, function(err, schedule){
            const response = {
                message: "Register deleted",
                id: register._id
            };
            return res.status(200).send(response);
          })

  })
})

module.exports = router;
