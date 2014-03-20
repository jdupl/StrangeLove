var express = require('express')
  , path = require('path')
  , router = require('./router')
  , mysql = require('mysql');
// create app
var app = express();

// setup app
app.use(express.json());
app.use(express.urlencoded());
app.use(mysql);

// pass the application to the router so it can create routes
router(app);

// start application
app.listen(3000);
