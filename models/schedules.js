var mongoose = require('mongoose');

// Service Schema
var SchedulesSchema = mongoose.Schema({
    free: {
        type: Boolean,
        unique: false,
    },
    time: {
        type: String,
    },
    date: {
        type: Date
    },
    master: {
        type: String
    }

});

var Schedule = module.exports = mongoose.model('Schedules', SchedulesSchema);


module.exports.createSchedule = function (newSchedules, callback) {

    newSchedules.save(callback);

}

module.exports.getScheduleById = function (id, callback) {

    Schedules.findById(id, callback);

}

module.exports.getSchedules = function(callback){

    Schedules.find(callback);

}

module.exports.updateSchedulesById = function(idSchedule, data, callback){

    Schedule.updateOne({ _id: idSchedule }, data, { new: true },callback)
  
}
