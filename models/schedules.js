var mongoose = require('mongoose');

// Service Schema
var SchedulesSchema = mongoose.Schema({
    free: {
        type: Boolean,
        unique: false,
    },
    time: {
        type: Object,
    },
    date: {
        type: Date
    },
    master: {
        type: Object
    },
    register:{
        type: Object
    }

});

var Schedule = module.exports = mongoose.model('Schedules', SchedulesSchema);


module.exports.createSchedule = function (newSchedules, callback) {

    newSchedules.save(callback);

}

module.exports.getScheduleById = function (id, callback) {

    Schedule.findById(id, callback);

}

module.exports.getSchedules = function(callback){

    Schedule.find(callback);

}

module.exports.updateSchedulesById = function(idSchedule, data, callback){

    Schedule.updateOne({ _id: idSchedule }, data, { new: true },callback)
  
}

module.exports.deleteSchedulesById = function( idSchedules, callback){

    Schedule.findByIdAndDelete({ _id: idSchedules }, callback)
  
}
