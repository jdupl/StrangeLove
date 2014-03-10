var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statSchema = new mongoose.Schema({
  timestamp:Number,
  unit_id:{type:Schema.Types.ObjectId, ref:'Unit'},
  temperature:Number,
  device_voltage:Number,
  engine_clock:Number,
  memory_clock:Number,
  fan_rpm:Number,
  hardware_errors:Number,
  shares_rejected:Number,
  shares_accepted:Number,
  hashrate:Number,
  intensity:Number,
  time_since_last_valid_work:Number,
  time_since_last_work:Number,
  machine_id:{type:Schema.Types.ObjectId, ref:'Machine'},
  uptime:Number,
  load_avg:[Number]
});

var Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
