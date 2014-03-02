var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: String,
  age: Number,
  stories: [{type: Schema.Types.ObjectId, ref:'Story'}]
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;
