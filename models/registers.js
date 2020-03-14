var path = require('path');

module.exports = function (mongoose) {

  
  var Schema = new mongoose.Schema({
    name: { type: String, required: true }
  });

  
  return mongoose.model(path.basename(module.filename, '.js'), Schema);
};