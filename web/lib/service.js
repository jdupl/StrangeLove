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
    knex('units').select().then(function(card) {
        cb({cards: card});
    });
};

/**
 * Returns total invalid and valid shares for a period of time of all cards
 */
exports.getShares = function(startDate, endDate, cb) {
    knex('stats').sum('shares_since_last_record as shares')
            .sum('invalid_shares_since_last_record as invalid_shares')
            .whereBetween('timestamp', [startDate, endDate])
            .then(function(info) {
                cb({poolInfo: info});
            });
};

exports.getCardsSummary = function(startDate, endDate, cb) {
    knex('stats')
            .select('device_id', 'model')
            .join('units', 'units.id', '=', 'stats.device_id')
            .sum('shares_since_last_record as shares')
            .sum('invalid_shares_since_last_record as invalid_shares')
            .avg('hashrate as hashrate')
            .whereBetween('timestamp', [startDate, endDate])
            .groupBy('device_id')
            .then(function(info) {
                cb(info);
            });
};
