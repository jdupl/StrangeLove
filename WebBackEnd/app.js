var express = require('express')
  , path = require('path')
  , router = require('./router');

// create app
var app = express();

// setup app
app.use(express.json());
app.use(express.urlencoded());

// pass the application to the router so it can create routes
router(app);

// start application
app.listen(3000);
