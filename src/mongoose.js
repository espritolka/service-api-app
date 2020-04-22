//var mongoose = require('mongoose');
import config from './config';
import mongoose from 'mongoose';
import async from "async";
import path from 'path';
import fs from 'fs'


//mongoose.connect(config.get('mongoose:uri') + ':'+ config.get('mongoose:port'), { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost/serviceDB', { useNewUrlParser: true, useUnifiedTopology: true })
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