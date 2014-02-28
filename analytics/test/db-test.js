var mysql = require('mysql');
var assert = require('assert');



describe('Database module', function(){
  describe('Sql testing', function(){
    var connection, options;
    beforeEach(function(done){
      options = {
	host:'localhost',
	user:'test',
	password:'',
	database:'strangelove_test'
      };
      connection = mysql.createConnection(options);
      done();
    });
    afterEach(function(done){
      connection.end();
      options = null;
      done();
    });
    it('should verify that the connection is not null', function(done){
      assert.notEqual(connection, null); 
      done();
    });
    it('should make a select query that will return nothing', function(done){
      connection.query('select * from machines', function(err, rows, fields){
        var array = [];
        assert.equal(err, null);
	assert.notEqual(rows, null);
	assert.equal(rows[0], undefined);
      });
      done();
    });
  });
  describe.skip('Instantiation', function(){
    beforeEach(function(done){
      var Database = require('../src/db.js');
      done();
    });
    it('should build a database object', function(done){
      
    });
  });
});
