var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shareSchema = new mongoose.Schema({
  user_id:{type:Schema.Types.ObjectId, ref:'User'},
  unit_id:{type:Schema.Types.ObjectId, ref:'Unit'},
  share:Number
});

var Share = mongoose.model('Share', shareSchema);

module.exports = Share;
