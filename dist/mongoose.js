'use strict';

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mongoose.connect(config.get('mongoose:uri') + ':'+ config.get('mongoose:port'), { useNewUrlParser: true, useUnifiedTopology: true });
_mongoose2.default.connect('mongodb://localhost/serviceDB', { useNewUrlParser: true, useUnifiedTopology: true }); //var mongoose = require('mongoose');

var db = _mongoose2.default.connection;

_mongoose2.default.set('useCreateIndex', true);

db.on('error', function (err) {
    console.log('DB connect error');
    // Обрабатываем ошибку
});
db.once('open', function callback() {
    console.log('DB connect');
    // Соединение прошло успешно
});

module.exports.mongoose = _mongoose2.default;