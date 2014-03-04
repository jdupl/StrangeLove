var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'Person'},
  title: String,
  fans: [{type:Schema.Types.ObjectId, ref:'Person'}]
});

var Story = mongoose.model('Story', storySchema);

module.exports = Story;
