var fs = require('fs')
        , uuid = require('uuid')
        , service = require('../lib/service.js');

function apiError(res, msg) {
    res.json({
        error: msg
    });
}

// controller routes
var routes = {};

routes.getCards = function(req, res) {
    service.getCards(function(json) {
        res.json(json);
    });
};

routes.getCardsSummary = function(req, res) {

    // if startdate is not defined, init to now less 24h
    req.params.startDate ? startDate = req.params.endDate : startDate = (new Date).getTime() / 1000 - 3600 * 24;
    // if enddate is not defined, init to now
    req.params.endDate ? endDate = req.params.endDate : endDate = (new Date).getTime() / 1000;

    service.getCardsSummary(startDate, endDate, function(json) {
        res.json(json);
    });
};

module.exports = routes;