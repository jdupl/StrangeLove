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

routes.getCards = function (req, res) {
    service.getCards(res)
}
routes.getCardsSummary = function (req, res) {
    startDate = req.params.startDate;
    endDate= req.params.endDate;
    service.getCardsSummary(startDate, endDate,res)
}

module.exports = routes;