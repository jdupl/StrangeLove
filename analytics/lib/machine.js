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

machineSchema.statics.findIpAddresses = function(cb){
  this.find().select({_id:0, ip_address:1}).exec(function(err, res){
    if(err){
      console.log(err);
    }
    cb(res);
  });
}

var Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
