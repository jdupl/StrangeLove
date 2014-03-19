var api = require('./controllers/api');

// function to setup routes
module.exports = function (app) {
  app.get('/', api.getCards);
};