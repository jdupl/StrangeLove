var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username:String,
  password:String,
  salt:String,
  email:String,
  wallet:String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
