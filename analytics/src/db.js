exports.insertStats = function(data){
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

};

var Database = function(connection){
  this.connection = connection;
};

Database.prototype.insertStats = function(data){
  stat_id = connection.escape(data.stat_id);
  device_id = connection.escape(data.device_id);
  temperature = connection.escape(data.temperature);
  device_voltage = connection.escape(data.device_voltage);
  engine_clock = connection.escape(data.engine_clock);
  memory_clock = connection.escape(data.memory_clock);
  fan_rpm = connection.escape(data.fan_rpm);
  hardware_errors = connection.escape(data.hardware_errors);
  shares_rejected = connection.escape(data.shares_rejected);
  shares_accepted = connection.escape(data.shares_accepted);
  hashrate = connection.escape(data.hashrate);
  intensity = connection.escape(data.intensity);
  time_since_last_work = connection.escape(data.time_since_last_work);
  time_since_last_valid_work = connection.escape(data.time_since_last_valid_work);
  var query = 'insert into stats(device_id, temperature, device_voltage, engine_clock, memory_clock, fan_rpm, hardware_errors, shares_rejected, shares_accepted, hashrate, intensity,time_since_last_work, time_since_last_valid_work, uptime, load_avg, timestamp, r_status, server_id) values(' + stat_id + ',' + ',' + device_id + ',' + temperature + ',' + device_voltage + ',' + engine_clock + ',' + memory_clock + ',' + fan_rpm + ',' + hardware_errors + ',' + shares_rejected + ',' + shares_accepted + ',' + hashrate + ',' + intensity + ',' + time_since_last_work + ',' + time_since_last_valid_work + ');';
  this.connection.query(query, function(err, rows, fields){
    if(err){
      console.log(err);
    };
  });
};
