const moment = require('moment');
const each = require('promise-each');

const knex = require('../knex');
const untappd = require('../utils/untappd');


const fetchRating = async beer => {
  const response = await untappd.getBeer({ beer_id: beer.id });
  return {
    avg_rating: response.rating_score,
    rating_count: response.rating_count
  };
};

const update = async (id, rating, count) => knex('beers').where({ id }).update({
  avg_rating: rating,
  rating_count: count,
  updated_at: knex.raw('CURRENT_TIMESTAMP'),
  rating_updated_at: knex.raw('CURRENT_TIMESTAMP')
});

/**
 * Updates beer ratings from Untappd API. Tries to prioritize beers that don't have their rating fetched yet or beers
 * that haven't had their rating updated in a long time.
 *
 * Because of API rate limiting only 20 beers are updated at a time.
 */
module.exports = async logger => {
  logger.info('Updating beer ratings...');

  const beers = await knex
    .select('id', 'rating_updated_at')
    .from('beers')
    .whereIn('id', function() {
      this.distinct('beer_id').from('checkins').where('checkin_time', '>', moment().subtract(2, 'weeks'));
    })
    .orderBy('rating_updated_at', 'desc')
    .limit(20);

  await each(async beer => {
    const response = await fetchRating(beer);
    await update(beer.id, response.avg_rating, response.rating_count);
  })(beers);

  logger.info(`Updated ratings for ${beers.length} beers.`);
};
