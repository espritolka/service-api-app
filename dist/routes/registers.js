'use strict';

var express = require('express');
var router = express.Router();

var _require = require('../validate'),
    validate = _require.validate;

var _require2 = require('express-validator'),
    check = _require2.check,
    validationResult = _require2.validationResult;

var Register = require('../models/registers');
var Schedule = require('../models/schedules');

router.get('/', function (req, res, next) {
  Register.getRegisters(function (err, register) {
    res.send(register);
  });
}).get('/register/:id', function (req, res, next) {
  res.send(req.params.id);
}).post('/register', validate('createRegister'), function (req, res, next) {

  var session = null;

  var errorFormatter = function errorFormatter(_ref) {
    var location = _ref.location,
        msg = _ref.msg,
        param = _ref.param,
        value = _ref.value,
        nestedErrors = _ref.nestedErrors;

    return '' + msg;
  };

  var errors = validationResult(req).formatWith(errorFormatter);;

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  var newRegister = new Register({
    service: req.body.service,
    schedule: req.body.schedule,
    client: req.body.client
  });

  newRegister.schedule._id = newRegister.schedule.master.schedule;

  // createRegister();

  // async function createRegister(){

  // const session = await Register.startSession();

  // session.startTransaction();
  //    try {
  //       const opts = { session };

  //       var data = {
  //         free: false,
  //         register: req.body
  //     } 


  //       const B = await Schedule.updateSchedulesById(req.body.schedule._id, data, opts)

  //       const A = await Register.createRegister(newRegister, opts)


  //       await session.commitTransaction();
  //       res.send('ok').end()
  //       return true;
  //    } catch (error){
  //       await session.abortTransaction();

  //       throw error; 
  //    }
  //    session.endSession();
  //   }
  Register.createRegister(newRegister, function (err, register) {
    if (err) throw err;
    var data = {
      free: false,
      register: register
    };

    Schedule.updateSchedulesById(req.body.schedule._id, data, function (err, schedule) {
      if (err) {
        Register.deleteRegisterById(register._id, function (err, reg) {
          if (err) throw err;
          res.status(422).send('Ошибка добавления записи').end;
        });
      } else {
        res.send(register).end();
      }
    });
  });
}).put('/register/:id', function (req, res, next) {
  Register.updateRegisterById(req.params.id, req.body, function (err, register) {
    res.send(register);
  });
}).delete('/register/:id', function (req, res, next) {

  Register.findByIdAndDelete(req.params.id, function (err, register) {
    if (err) throw err;

    var data = {
      free: true,
      register: {}
    };
    Schedule.updateSchedulesById(req.params.id, data, function (err, schedule) {
      var response = {
        message: "Register deleted",
        id: register._id
      };
      return res.status(200).send(response);
    });
  });
});

module.exports = router;