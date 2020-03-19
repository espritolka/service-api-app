var mongoose = require('mongoose');

// Service Schema
var DirectorySchema = mongoose.Schema({
    value: {
        type: String,
        index: true,
    },
    label: {
        type: String,
        unique: true,
        index: true,
    },
    type: {
        type: String,
        index: true,
    },
});

var Directory = module.exports = mongoose.model('Directory', DirectorySchema);


module.exports.createDirectory = function (newDirectory, callback) {

    newDirectory.save(callback);

}

module.exports.getDirectoryById = function (id, callback) {

    Directory.findById(id, callback);

}

module.exports.getDirectorys = function(dirType,callback){

    var query = {type: dirType};
  
    Directory.find(query, callback);

}

module.exports.updateDirectoryById = function( idDirectory, data, callback){

    Directory.updateOne({ _id: idDirectory }, data, { new: true },callback)
  
}

module.exports.deleteDirectoryById = function( idDirectory, callback){

    Directory.findByIdAndDelete({ _id: idDirectory }, callback)
  
}