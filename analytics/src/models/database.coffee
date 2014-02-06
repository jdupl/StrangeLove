#Database
#======================
#Author : Félix Leblanc

#Requiring modules
driver = require 'mysql'
winston = require 'winston'

#Class declaration
class Database

  #Constructor  
  #@param options  
  #The database connection options
  constructor: (options) ->
    @connection = driver.createConnection(options)
 
  #Open and return the database connection with the callback function  
  #@param callback   
  #The callback function
  open: (callback) ->
    @connection.connect (err) ->
      winston.log err if err
      callback err, @connection
