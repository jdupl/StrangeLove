//Requiring modules
var mongoose = require('mongoose');
var faker = require('Faker');
var assert = require('chai').assert;
var async = require('async');

//Importing models
var Machine = require('../lib/machine.js');


describe('Models', function(){
  describe('Machine', function(){
    before(function(done){
      mongoose.connect('mongodb://localhost/strangelove_test');
      Machine.remove({}, function(err){
        done(); 
      });
    });
    after(function(done){
      mongoose.disconnect();
      done();
    });
    describe('#ip_address', function(){
      it('should get all the ip adresses', function(done){
	//Save two ip addresses
	var m1 = new Machine({
	  name:faker.Name.findName(),
	  total_slots:2,
	  motherboard_model:'model',
	  motherboard_serial_number:'serial',
	  value:200,
	  ip_address:'192.168.1.1'
	});
	var m2 = new Machine({
	  name:faker.Name.findName(),
	  total_slots:2,
	  motherboard_model:'model',
	  motherboard_serial_number:'serial',
	  value:200,
	  ip_address:'192.168.1.2'
	});
	m1.save(function(err){
	  m2.save(function(err){
	    //Find the ip addresses
	    Machine.findIpAddresses(function(res){
	      assert.isDefined(res);
	      assert.equal(2, res.length);
	      assert.equal(res[0], m1.ip_address);
	      done();
	    });
	  });
	});
      });
    });
  });
});
