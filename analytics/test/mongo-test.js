var mongoose = require('mongoose');
var assert = require('chai').assert;
var Cat = require('./cat.js');
var Story = require('./story.js');
var Person = require('./person.js');

mongoose.connect('mongodb://localhost/strangelove_test');

describe('Mongoose', function(){
  afterEach(function(done){
    Cat.remove().exec();
    Story.remove().exec();
    Person.remove().exec(done);
  });
  describe('Basic CRUD operations on Cat model', function(){
    it('should declare and save data in a model', function(done){
      var kitty = new Cat({name:'kitty'});
      assert.equal(kitty.name, 'kitty');
      kitty.save(function(err){
        assert.isNull(err);
	kitty.findByName(kitty.name, function(err, cats){
	  assert.isNull(err);
	  assert.isNotNull(cats);
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
  describe('References on Story and Person model', function(){
    it('should save a story and an author mapped to it', function(done){
     var aaron = new Person({name:'Aaron', age: 100});
     aaron.save(function(err){
       assert.equal(err, null);
       var story1 = new Story({
         title:'Once upon a time',
	 _creator: aaron._id
       });
       story1.save(function(err){
         assert.isNull(err);
	 assert.isNotNull(story1.title);
	 Story.findOne({title:story1.title}, '_creator').populate('_creator', 'name').exec(function(err, story){
	   assert.isNull(err);
	   assert.equal(story._creator.name, aaron.name);
	   done();
	 });
       });
     });
    });
  });
});
