var mongoose = require('mongoose');

var statSchema = new mongoose.Schema({
  timestamp:Number,
  unit_id:{type:Number, ref:'Unit'},
  temperature:Number,
  device_voltage:Number,
  engine_clock:Number,
  memory_clock:Number,
  fan_rpm:Number,
  hardware_errors:Number,
  shares_rejected:Number,
  shares_rejected:Number,
  hashrate:Number,
  intensity:Number,
  time_since_last_work,
  time_since_last_work,
  machine_id:{type:Number, ref:'Machine'},
  uptime:Number,
  load_avg:Number
});

var Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
