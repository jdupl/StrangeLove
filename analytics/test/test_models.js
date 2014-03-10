//Requiring modules
var mongoose = require('mongoose');
var assert = require('chai').assert;
var async = require('async');
var crypto = require('crypto');

//Importing models
var User = require('../lib/user.js');
var Machine = require('../lib/machine.js');
var Unit = require('../lib/unit.js');
var Stat = require('../lib/stat.js');
var Share = require('../lib/share.js');

mongoose.connect('mongodb://localhost/strangelove_test');

describe.only('Models', function(){
  afterEach(function(done){
    User.remove().exec();
    Machine.remove().exec();
    Unit.remove().exec();
    done();
  });
  describe('Share', function(){
    it('Should save a share', function(done){
      var unit1 = new Unit();
      var user1 = new User();
      var share1 = new Share({
        user_id:user1._id,
	unit_id:unit1._id,
	share:25
      });
      share1.save(function(err){
        assert.isNull(err);
	Share.find({share:25}).select({_id:0}).exec(function(err, share){
	  assert.isNull(err);
	  assert.isDefined(share[0]);
	  assert.equal(share[0].share, share1.share);
	});
	done();
      });
    });
  });
  describe('Unit', function(){
    it('should save a unit document', function(done){
      var machine1 = new Machine();
      var date = new Date().getTime();
      var data = {
        machine_id:machine1._id,
	model:'1',
	installation_date:date,
	purchase_date:date,
	serial_number:'serial',
	warranty_expiration_date:date
      };
      var unit1 = new Unit(data);
      assert.equal(unit1.machine_id, machine1._id);
      unit1.save(function(err){
        assert.isNull(err);
	Unit.find().exec(function(err, res){
	  assert.isNull(err);
	  assert.isNotNull(res);
	  assert.isDefined(res[0]);
	  assert.equal(res[0].model, data.model);
	  assert.equal(res[0].machine_id, data.machine_id + '');
	  done();
	});
      });
    });
    it('should save a unit and populate the referenced machine', function(done){
      var date = new Date().getTime();
      var machine1 = new Machine({
        name:'m1',
	total_slots:2,
	motherboard_model:'mod1',
	motherboard_serial_number:'serial',
	value:200,
	ip_address:'192.168.1.1'
      });
      var data = {
        machine_id:machine1._id,
	model:'1',
	installation_date:date,
	purchase_date:date,
	serial_number:'serial',
	warranty_expiration_date:date
      };
      var unit1 = new Unit(data);
      assert.equal(unit1.machine_id, machine1._id);
      unit1.save(function(err){
        assert.isNull(err);
	machine1.save(function(err){
	  assert.isNull(err);
	  Unit.find({model:data.model}).populate('machine_id').exec(function(err, res){
	    assert.isNull(err);
	    assert.isNotNull(res);
	    assert.isDefined(res[0]);
	    assert.equal(res[0].model, data.model);
	    assert.equal(res[0].machine_id.ip_address, machine1.ip_address);
	    done();
	  });
	});
      });
    });
  });
  describe('Stat', function(){
    it('should save a stat', function(done){
      var date = new Date().getTime();
      var machine1 = new Machine({
        total_slots:3, 
	installation_date:date,
	motherboard_serial_number:'serial',
	value:34,
	ip_address:'192.168.1.1'
      });
      var unit1 = new Unit({
	machine_id:machine1._id,
	model:'1',
	installation_date:date,
	purchase_date:date,
	serial_number:'serial',
	warranty_expiration_date:date
      });
      var stat1 = new Stat({
	timestamp:2345234123,
	unit_id:unit1._id,
	temperature:12,
	device_voltage:45,
	engine_clock:34,
	memory_clock:34,
	fan_rpm:33,
	hardware_errors:46,
	shares_rejected:67,
	shares_accepted:22,
	hashrate:11,
	intensity:45,
	time_since_last_valid_work:120,
	time_since_last_work:66,
	machine_id:machine1._id,
	uptime:45,
	load_avg:[12,33,22]
      });
      stat1.save(function(err){
	assert.isNull(err);
	Stat.find({temperature:12}).select({_id:0}).exec(function(err,stat){
	  assert.isNull(err);
	  assert.isDefined(stat[0]);
	  assert.equal(stat[0].load_avg[0], 12);
	  done();
	});
      });
    });
  });
  describe('Machine', function(){
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
	  done();
	});
      });
    });
  });
  describe('User', function(){
    it('should save a user document', function(done){
      var data = {
        username:'user1',
	password:'pass1',
	salt:'not a salt',
	email:'user1@email.com',
	wallet:'hash'
      };
      var user1 = new User(data);
      user1.save(function(err){
        assert.isNull(err);
	User.find({name:data.name}).select({_id:0}).exec(function(err, res){
	  assert.isNull(err);
	  assert.isNotNull(res);
	  assert.equal(res[0].username, data.username);
	  done();
	});
      });
    });
    it('should save a user and verify the hash setter method', function(done){
      var data = {
        username:'user1',
	password:'pass1',
	salt:'not a salt',
	email:'user1@email.com',
	wallet:'hash'
      };
      var user1 = new User(data);
      user1.save(function(err){
        assert.isNull(err);
	User.find({name:data.name}).select({_id:0}).exec(function(err, res){
	  assert.isNull(err);
	  assert.isNotNull(res);
	  assert.equal(res[0].username, data.username);
	  assert.notEqual(res.password, data.password);
	  var hash = crypto.createHash('sha1');
	  hash.update(data.password, 'utf-8');
	  var hashedInsertPass = hash.digest('base64');
	  assert.equal(hashedInsertPass, res[0].password);
	  done();
	});
      });
    });
  });
});

