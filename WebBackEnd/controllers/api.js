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
    res.json({
      cards: service.getCards()
    });
}

module.exports = routes;