var mongoose = require('mongoose');

var db = mongoose.createConnection('localhost', 'strangelove_test');

var catSchema = new mongoose.Schema({
  name : String
});

catSchema.methods.findByName = function(name, cb){
 return this.model('Cat').find({name:name}).select({_id:0}).exec(cb);
};

module.exports = db.model('Cat', catSchema);
