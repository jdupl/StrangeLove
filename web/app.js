var express = require('express'),
        path = require('path'),
        knex = require('knex'),
        router = require('./router'),
        mysql = require('mysql');
// create app
var app = express();

// setup app
app.use(express.json());
app.use(express.urlencoded());
app.use(mysql);
app.use(express.static(__dirname + '/app'));

// pass the application to the router so it can create routes
router(app);

// start application
app.listen(3000);
