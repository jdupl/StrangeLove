var api = require('./controllers/api');

// function to setup routes
module.exports = function(app) {
    //app.get('/user/shares/:userId/:startDate?/:endDate', api.getUserShares); // userDetails Milestone 4
    app.get('/api/summary/:startDate?/:endDate?', api.getCardsSummary); // card summary Milestone 3
  app.get('/api/lastest', api.getCardsLastest);
};
