var express = require('express');
var router = express.Router();

var Schedule = require('../models/schedules')

router.get('/', function (req, res, next) {

    Schedule.getSchedule(function (err, schedules) {
    res.send(schedules)
  })

})
  .get('/schedule/:id', function (req, res, next) {
    res.send(ireq.params.id)
  })
  .post('/schedule', function (req, res, next) {

    var newSchedule = new Schedule({
      master: req.body.master.id,
      time: req.body.time.id,
      date: req.body.date,
      free: true
    })

    Schedule.createSchedule(newService, function (err, schedule) {
      if (err) throw err;
      res.send(schedule).end()
    });

  })
  .put('/schedule/:id', function (req, res, next) {
    Schedule.updateScheduleById(req.params.id, req.body, function (err, schedule) {
      res.send(schedule)
    })
  })
  .delete('/schedule/:id', function (req, res, next) {
    res.send("i'm delete (No)");
  })

module.exports = router;
