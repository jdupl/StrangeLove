// service functions

var mysql = require('mysql');
var Knex = require('knex');
//var knex = require('knex').knex;

var connProperties = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: "strangelove"
};

var knex = Knex.initialize({
    client: "mysql",
    connection: connProperties
});

var connection = mysql.createConnection(connProperties);

exports.getCards = function(cb) {
    cards = [];
    knex('units').select().then(function(card) {
        cb({cards: card});
    });
};

exports.getCardsSummary = function(startDate, endDate, cb) {
    connection.query("SELECT  device_id , SUM(shares_since_last_record) AS shares_valid, SUM(invalid_shares_since_last_record) AS shares_invalid , AVG(hashrate) AS hashrate , SUM(shares_since_last_record) / ( SELECT  SUM(shares_since_last_record) FROM stats WHERE timestamp between " + startDate + " AND " + endDate + ") * 100 as percentage FROM stats WHERE timestamp between " + startDate + " AND " + endDate + " GROUP BY device_id", function(err, rows) {
        cb({summary: rows});
    });
};