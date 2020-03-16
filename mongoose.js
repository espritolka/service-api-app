var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('./config');

mongoose.connect(config.get('mongoose:uri') + ':'+ config.get('mongoose:port'), { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

mongoose.set('useCreateIndex', true);

db.on('error', function (err) {
    console.log('DB connect error')
  // Обрабатываем ошибку
});
db.once('open', function callback() {
    console.log('DB connect')
  // Соединение прошло успешно
});

module.exports.mongoose = mongoose;