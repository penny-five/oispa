const knex = require('../knex');

const untappd = require('../utils/untappd');


const fetchRating = async beer => {
  const response = await untappd.getBeer({ beer_id: beer.id });
  return {
    beer,
    value: response.rating_score
  };
};

const update = async rating => knex('beers').where({ id: rating.beer.id }).update({
  rating: rating.value,
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
    .limit(3);

  const ratings = await Promise.all(beers.map(fetchRating));
  await Promise.all(ratings.map(update));

  console.log(`Updated ratings for ${ratings.length} beers.`);
};
