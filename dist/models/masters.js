'use strict';

var mongoose = require('mongoose');

// Master Schema
var MasterSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    }
});

var Master = module.exports = mongoose.model('Master', MasterSchema);

module.exports.createMaster = function (newMaster, callback) {

    newMaster.save(callback);
};

module.exports.getMasterById = function (id, callback) {

    Master.findById(id, callback);
};

module.exports.getMasters = function (callback) {

    Master.find(callback);
};
module.exports.updateMasterById = function (idMaster, data, callback) {

    Master.updateOne({ _id: idMaster }, data, { new: true }, callback);
};

module.exports.deleteMasterById = function (idMaster, callback) {

    Master.findByIdAndDelete({ _id: idMaster }, callback);
};