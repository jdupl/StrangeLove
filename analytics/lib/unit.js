var mongoose = require('mongoose');

var unitSchema = new mongoose.Schema({
  machine_id:{type:Number, ref:'Machine'},
  model:Number,
  installation_date:Date,
  purchase_date:Date,
  seral_number:String,
  warranty_expiration_date:Date
});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
