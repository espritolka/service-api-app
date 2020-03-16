var mongoose = require('mongoose');

// Service Schema
var ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
    },
    price: {
        type: Number,
        index: true,
        unique: false
    }
});

var Service = module.exports = mongoose.model('Service', ServiceSchema);


module.exports.createService = function (newService, callback) {

    newService.save(callback);

}

module.exports.getServiceById = function (id, callback) {

    Service.findById(id, callback);

}

module.exports.getServices = function(callback){

    Service.find(callback);

}

module.exports.updateServiceById = function(idService, data, callback){

    Service.updateOne({ _id: idService }, data, { new: true },callback)
  
}
