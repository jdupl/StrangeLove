var mysql = require('mysql');
var request = require('request');
var async = require('async');
 
var connection;
  
//Create the database connection
connection = mysql.createConnection({
  host:'localhost',
  user:'user',
  pass:'pass',
  database:'db'
});
 
function insert_stats(data){
  //Insert in the stats table
  var stats_query = 'insert into stats(device_id, temperature,' +
  'device_voltage, engine_clock, memory_clock, fan_rpm,' +
  'hardware_errors, shares_rejected, shares_accepted, hashrate,' +
  'intensity, time_since_last_work, time_since_last_valid_work) ' +
  'values(' + data.device_id + ',' + data.temperature + ',' +
  data.device_voltage + ',' + data.engine_clock + ',' +
  data.memory_clock + ',' + data.fan_rpm + ',' +
  data.hardware_errors + ',' + data.shares_rejected + ',' +
  data.shares_accepted + ',' + data.hashrate + ',' +
  data.intensity + ',' + data.time_since_last_work + ',' +
  data.time_since_last_valid_work + ');';
  connection.query(stats_query, function(err, rows, fields){
    if(err){
      console.log(err);
    }
  });
}
 
function insert_server_stats(data){
  //Insert in the server_stats table
  var stats_machines_query = 'insert into stats_machines(machine_id,' +
  'uptime, load_avg, timestamp) values(' + machine_id + ',' +
  uptime + ',' + load_avg + ',' + timestamp + ');';
  connection.query(stats_machines_query, function(err, rows, fields){
    if(err){
      console.log(err);
    }
  });
}
  
function insert_data(err, res, body){
  var data;
  if(err){
    console.log(err);
  }
  //Timeout error
  if(res.statusCode == 408){
    data = {
      //Timeout data to be inserted
    };
  }
  if(res.statusCode == 200){
    data = body;
  }
  async.parallel([insert_stats(data), insert_server_stats(data)]);
}

function ip_iterator(ip_adress, callback){
  options = {
     url: 'http://' + ip_adress,
     headers: {
       'User-Agent': 'analytics server'
     },
     timeout: 5000
  };
  request(options, insert_data);
}

get_machines_ip = function(){
  var sql = 'select machines.ip_adress from machines';
  connection.query(sql, function(err, rows, fields){
      if(err){
        console.log(err);
      }
      return rows;
  });
};

async.each(get_machines_ip, ip_iterator, function(err){
    if(err){
      console.log(err);
    }
});

connection.end();

process.exit();
