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
}
 
function insert_server_stats(data){
  //Insert in the server_stats table
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
