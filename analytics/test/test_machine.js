//Requiring modules
var mongoose = require('mongoose');
var assert = require('chai').assert;
var async = require('async');

//Importing models
var Machine = require('../lib/machine.js');

mongoose.connect('mongodb://localhost/strangelove_test');

describe('Machine', function(){
  afterEach(function(done){
    Machine.remove().exec(done);
  });
  describe('CRUD', function(){
    it('should save a machine document', function(done){
      var date = new Date().getTime();
      var data = {name:'machine1',
        total_slots:3, 
	installation_date:date,
	motherboard_serial_number:'serial',
	value:34,
	ip_address:'192.168.1.1'
      };
      var machine = new Machine(data);
      machine.save(function(err){
        assert.isNull(err);
	Machine.find({name:'machine1'}).select({_id:0}).exec(function(err, res){
	  assert.isNull(err);
	  assert.equal(res[0].name, data.name);
	  assert.equal(res[0].units.length, 0);
	  done();
	});
      });
    });
  });
});
