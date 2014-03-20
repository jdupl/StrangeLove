var api = require('./controllers/api');

// function to setup routes
module.exports = function (app) {
  app.get('/cards', api.getCards);
  app.get('/summary/:startDate/:endDate', api.getCardsSummary);
};