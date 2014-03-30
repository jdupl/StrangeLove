var fs = require('fs')
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

//routes.getUserShares = function(req, res) {
//  // if startdate is not defined, init to now less 24h
//  req.params.startDate ? startDate = req.params.endDate
//          : startDate = (new Date).getTime() / 1000 - 3600 * 24;
//  // if enddate is not defined, init to now
//  req.params.endDate ? endDate = req.params.endDate : endDate = (new Date)
//          .getTime() / 1000;
//
//  //get pool total shares
//  service.getShares(startDate, endDate, function(json) {
//      poolInfo = json.poolInfo;
//  });
//
//  // get userShares per cards
//  // TODO
//};

routes.getCardsSummary = function(req, res) {

    startMs = Date.now();

    // if startdate is not defined, init to now less 24h
    req.params.startDate ? startDate = req.params.startDate : startDate = (new Date).getTime() / 1000 - 3600 * 24;
    // if enddate is not defined, init to now
    req.params.endDate ? endDate = req.params.endDate : endDate = (new Date).getTime() / 1000;

    totals = {shares: 0, invalid_shares: 0, hashrate: 0};

    status = {start_date: startDate, end_date: endDate};

    service.getCardsSummary(startDate, endDate, function(devices) {
        // get the total hashrate and shares
        for (i = 0; i < devices.length; i++) {
            totals.shares += devices[i].shares;
            totals.invalid_shares += devices[i].invalid_shares;
            totals.hashrate += devices[i].hashrate;
            // calculate device's reject ratio
            devices[i].rejected_ratio = devices[i].invalid_shares / devices[i].shares * 100;
        }
        // calculate relative pool percentage of shares
        devices.forEach(function (device) {
            device.pool_shares = device.shares / totals.shares * 100;
        });

        // calculate pool total reject ratio
        totals.reject_ratio = totals.invalid_shares / totals.shares * 100;

        endMs = Date.now();

        status.ms = endMs -startMs;
//        res.json({total: totals, devices: devices, status: status});

        //BROKEN
        res.send(200, JSON.stringify({total: totals, devices: devices, status: status}));
    });
};

module.exports = routes;
