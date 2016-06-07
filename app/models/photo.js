var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  message: String,
  url: String,
  weather: String,
  temp: String,
  weather: String,
  location: String
});

PhotoSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Photo', PhotoSchema);
