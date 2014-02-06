#Database class testing
#Requiring  modules
Database = require '../models/database.js'

#Instantiating classes
options = {host:'localhost', user:'node-test', password:''}
database = new Database(options)
