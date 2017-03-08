const _ = require('lodash');

const logger = require('../../utils/logger').create('tasks');


/* eslint-disable global-require */
module.exports = {
  updateBeerRatings: _.partial(require('./update_beer_ratings'), logger),
  updateBeerstyles: _.partial(require('./update_beerstyles'), logger),
  updateCheckins: _.partial(require('./update_checkins'), logger)
};
