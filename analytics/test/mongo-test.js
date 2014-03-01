var mongoose = require('mongoose');
var assert = require('assert');
var Cat = require('./cat.js');

var db = mongoose.createConnection('localhost', 'strangelove_test');

describe('Mongoose', function(){
  afterEach(function(done){
    Cat.remove({}, done);
  });
  describe('Basic functionnality', function(){
    it('should declare and save data in a model', function(done){
      var kitty = new Cat({name:'kitty'});
      assert.equal(kitty.name, 'kitty');
      kitty.save(function(err){
        assert.equal(err, null);
	kitty.findByName(kitty.name, function(err, cats){
	  assert.equal(err, null);
	  assert.notEqual(cats, null);
	  assert.equal(cats[0]._id, undefined);
	  assert.equal(cats[0].name, 'kitty');
	  done();
	});
      });
    });
    it('should declare and save data in a model', function(done){
      var choupette = new Cat({name:'choupette'});
      assert.equal(choupette.name, 'choupette');
      choupette.save(function(err){
        assert.equal(err, null);
	choupette.findByName(choupette.name, function(err, cats){
	  assert.equal(err, null);
	  assert.notEqual(cats, null);
	  assert.equal(cats[0]._id, undefined);
	  assert.equal(cats[0].name, 'choupette');
	  done();
	});
      });
    });
  });
});
