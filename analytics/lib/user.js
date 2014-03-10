var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  username:String,
  password:{type:String, set: hash},
  salt:String,
  email:String,
  wallet:String
});

function hash(pass){
  var hash = crypto.createHash('sha1');
  hash.update(pass, 'utf-8');
  return hash.digest('base64');
}

var User = mongoose.model('User', userSchema);

module.exports = User;
