// service functions

var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123',
    database: "strangelove"
});

exports.getCards = function (res) {
    connection.query('select * from units', function(err, rows) {
        res.json({
            cards: rows
        });
    });
};

exports.getCardsSummary = function (startDate, endDate, res) {
connection.query("SELECT device_id, SUM(shares_since_last_record) as shares_valid, SUM(invalid_shares_since_last_record) as shares_invalid, AVG(hashrate) as hashrate FROM stats WHERE timestamp < " + endDate +" and timestamp > " + startDate +" GROUP BY device_id", function(err, rows) {
        if(err) throw err;
        res.json({
            summary: rows
        });
    });
};