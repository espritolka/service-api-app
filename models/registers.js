var mongoose = require('mongoose');

// Register Schema
var RegisterSchema = mongoose.Schema({
    schedule: {
        type: Object,
        index: true,
    },
    service: {
        type: Object
    },
    client:{
      type: Object
    }
});

var Register = module.exports = mongoose.model('Register', RegisterSchema);


module.exports.createRegister = function (newRegister, callback) {

    newRegister.save(callback);

}

module.exports.getRegisterById = function (id, callback) {

  Register.findById(id, callback);

}

module.exports.getRegisters = function(callback){

  Register.find(callback);

}
module.exports.updateRegisterById = function(idRegister, data, callback){

  Register.updateOne({ _id: idRegister }, data, { new: true },callback)
  
}

module.exports.deleteRegisterById = function( idRegister, callback){

  Register.findByIdAndDelete({ _id: idRegister }, callback)

}