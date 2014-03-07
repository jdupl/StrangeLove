var mongoose = require('mongoose');

var shareSchema = new mongoose.Schema({
  user_id:{type:Number, ref:'User'},
  unit_id:{type:Number, ref:'Unit'},
  share:Number
});
