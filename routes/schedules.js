var express = require('express');
var router = express.Router();

var Schedule = require('../models/schedules')

router.get('/', function (req, res, next) {
    Schedule.getSchedules(function (err, schedule) {
    res.send(schedule)
  })

})
  .get('/schedule/:id', function (req, res, next) {
    res.send(req.params.id)
  })
  .post('/schedule', function (req, res, next) {


    req.body.time.map((time)=>{
      let newSchedule = new Schedule({
        master: req.body.master,
        time: time,
        date: req.body.date,
        free: true,
        register: {id: null}
      })
      Schedule.createSchedule(newSchedule, function (err, schedule) {

        if (err) throw err;
        res.send(schedule).end()
      });
    })
    
  })
  .put('/schedule/:id', function (req, res, next) {
    Schedule.updateScheduleById(req.params.id, req.body, function (err, schedule) {
      res.send(schedule)
    })
  })
  .delete('/schedule/:id', function (req, res, next) {
    Schedule.getScheduleById(req.params.id, function(err, schedule){

      if (schedule.free){
        Schedule.findByIdAndDelete(req.params.id, function(err, schedule){
          if (err) throw err;
          const response = {
            message: "Schedule deleted",
            id: schedule._id
        };
        return res.status(200).send(response);
        })
      } else {
        res.status(422).send("Нельзя удалить запись со статусом 'Занято'" + schedule._id);
      }
    })
  })

module.exports = router;
