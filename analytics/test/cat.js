var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
  name : String
});

catSchema.methods.findByName = function(name, cb){
 return this.model('Cat').find({name:name}).select({_id:0}).exec(cb);
};

var Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
