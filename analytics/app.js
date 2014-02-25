var winston = require('winston');
var request = require('request');
var mysql = require('mysql');

//Mining server url
var ip = 'http://192.168.1.118';
var port = '80';
var url = ip + ':' + port;
//Mining server options
var options = {
  url:url,
  headers{
    'Content-type' : 'application/json'
  }
};

//Setting up the database connection
var connection = mysql.createConnection({
  host:'localhost',
  user:'strangelove',
  password:''
});

//Connect to the database
connection.connect(function(err){
  if(err){
    console.log(err);
  }
  console.log('Connected to mysql');
});

//Http request to get the miner performance
request(options, function(err, response, body){
  if(err){
    console.log(err);
  }
  if(response.statusCode != 200){
    console.log(response.statusCode);
  } else {
    //Escape the body information
    stat_id = connection.escape(stat_id);
    device_id = connection.escape(device_id);
    temperature = connection.escape(temperature);
    device_voltage = connection.escape(device_voltage);
    engine_clock = connection.escape(engine_clock);
    memory_clock = connection.escape(memory_clock);
    fan_rpm = connection.escape(fan_rpm);
    hardware_errors = connection.escape(hardware_errors);
    shares_rejected = connection.escape(shares_rejected);
    shares_accepted = connection.escape(shares_accepted);
    hashrate = connection.escape(hashrate);
    intensity = connection.escape(intensity);
    time_since_last_work = connection.escape(time_since_last_work);
    time_since_last_valid_work = connection.escape(time_since_last_valid_work);
    uptime = connection.escape(uptime);
    load_avg = connection.escape(load_avg);
    timestamp = connection.escape(timestamp);
    r_status = connection.escape(r_status);
    server_id = connection.escape(server_id);
    units_id = connection.escape(units_id);
    machines_id = connection.escape(machines_id);
    //Insert the data in the database
    var query = 'insert into stats(device_id, temperature, device_voltage, engine_clock, memory_clock, fan_rpm, hardware_errors, shares_rejected, shares_accepted, hashrate, intensity,time_since_last_work, time_since_last_valid_work, uptime, load_avg, timestamp, r_status, server_id) values(
  }
})
