var mongoose = require('mongoose');
var async = require('async');
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
    async.map(res, function(machine, cb){
      cb(null, machine.ip_address);
    },
    function(err, ip_addresses){
      if(err){
        console.log(err);
      };
      cb(ip_addresses);
    });
  });
}

var Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
