var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unitSchema = new mongoose.Schema({
  machine_id:{type:Schema.Types.ObjectId, ref:'Machine'},
  model:Number,
  installation_date:Date,
  purchase_date:Date,
  serial_number:String,
  warranty_expiration_date:Date
});

var Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
