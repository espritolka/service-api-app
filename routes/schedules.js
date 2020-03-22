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
        
      });
    })
    res.send('ok').end()
    
  })
  .put('/schedule/:id', function (req, res, next) {
    Schedule.updateScheduleById(req.params.id, req.body, function (err, schedule) {
      res.send(schedule)
    })
  })
  .delete('/schedule/:id', function (req, res, next) {
    Schedule.getScheduleById(req.params.id, function(err,schedule ){

      if (schedule.free){
        Schedule.findByIdAndDelete(req.params.id, function(err, directory){
          if (err) throw err;
          res.send("ok");
        })
      } else {
        res.status(422)
        res.send("Нельзя удалить запись со статусом 'Занято'" + schedule._id);
      }
    })
  })

module.exports = router;
