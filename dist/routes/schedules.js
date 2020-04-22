'use strict';

var express = require('express');
var router = express.Router();

var Schedule = require('../models/schedules');

router.get('/', function (req, res, next) {
  Schedule.getSchedules(function (err, schedule) {
    res.send(schedule);
  });
}).get('/schedule/:id', function (req, res, next) {
  res.send(req.params.id);
}).post('/schedule', function (req, res, next) {

  var lendth = req.body.time.length;
  req.body.time.map(function (time, i) {
    var newSchedule = new Schedule({
      master: req.body.master,
      time: time,
      date: req.body.date,
      free: true,
      register: { id: null }
    });
    Schedule.createSchedule(newSchedule, function (err, schedule) {
      if (err) throw err;
      i + 1 == lendth && res.send('ok');
    });
  });
}).put('/schedule/:id', function (req, res, next) {
  Schedule.updateScheduleById(req.params.id, req.body, function (err, schedule) {
    res.send(schedule);
  });
}).delete('/schedule/:id', function (req, res, next) {
  Schedule.getScheduleById(req.params.id, function (err, schedule) {

    if (schedule.free) {
      Schedule.findByIdAndDelete(req.params.id, function (err, schedule) {
        if (err) throw err;
        var response = {
          message: "Schedule deleted",
          id: schedule._id
        };
        return res.status(200).send(response);
      });
    } else {
      res.status(422).send("Нельзя удалить запись со статусом 'Занято'" + schedule._id);
    }
  });
}).get('/time/:timeId/date/:dateReq', function (req, res, next) {

  var parseDate = new Date(Date.parse(req.params.dateReq));

  var start = new Date(parseDate.getFullYear(), parseDate.getMonth(), parseDate.getDate(), 0, 0, 0);
  var end = new Date(parseDate.getFullYear(), parseDate.getMonth(), parseDate.getDate(), 23, 59, 59);

  var data = {
    $and: [{ date: { $gte: start, $lt: end } }, { 'time._id': req.params.timeId }, { free: true }]
  };

  Schedule.find(data, 'master', function (err, schedule) {
    var list = schedule.map(function (item) {
      item.master.schedule = item._id;
      return item.master;
    });
    return res.status(200).send(list);
  });
});

module.exports = router;