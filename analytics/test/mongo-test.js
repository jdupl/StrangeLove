var mongoose = require('mongoose');
var assert = require('assert');

var db = mongoose.createConnection('localhost', 'strangelove_test');


describe('Mongoose', function(){
  var Cat;
  afterEach(function(done){
    Cat.remove({}, done);
  });
  describe('Basic functionnality', function(){
    it('should declare and save data in a model', function(done){
      var catSchema = new mongoose.Schema({name:String});
      Cat = db.model('Cat', catSchema);
      var kitty = new Cat({name:'kitty'});
      assert.equal(kitty.name, 'kitty');
      kitty.save(function(err){
        assert.equal(err, null);
	Cat.find({name:'kitty'}, function(err, res){
	  assert.equal(err, null);
	  assert.notEqual(res, null);
	  assert.equal(res[0].name, 'kitty');
	  done();
	});
      });
    });
  });
});
