var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var machineSchema = new Schema({
  name:String,
  total_slots:Number,
  installation_date:Date,
  motherboard_model:String,
  motherboard_serial_number:String,
  value:Number,
  ip_address:String
});

var Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
