const knex = require('../knex');

const untappd = require('../utils/untappd');


const fetchRating = async beer => {
  const response = await untappd.getBeer({ beer_id: beer.id });
  return {
    beer,
    avg_rating: response.rating_score,
    rating_count: response.rating_count
  };
};

const toUpdate = async response => knex('beers').where({ id: response.beer.id }).update({
  avg_rating: response.avg_rating,
  rating_count: response.rating_count,
  updated_at: knex.raw('CURRENT_TIMESTAMP'),
  rating_updated_at: knex.raw('CURRENT_TIMESTAMP')
});

/**
 * Updates beer ratings from Untappd API. Tries to prioritize beers that don't have their rating fetched yet or beers
 * that haven't had their rating updated in a long time.
 *
 * Because of API rate limiting only 20 beers are updated at a time.
 */
module.exports = async () => {
  console.log('Updating beer ratings');

  const beers = await knex
    .select('id', 'rating_updated_at')
    .from('beers')
    .orderBy('rating_updated_at', 'desc')
    .limit(20);

  const responses = await Promise.all(beers.map(fetchRating));
  const updates = responses.map(toUpdate);
  await Promise.all(updates);

  console.log(`Updated ratings for ${responses.length} beers.`);
};
