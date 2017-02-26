const _ = require('lodash');

const untappd = require('../utils/untappd');
const knex = require('../knex');
const upsert = require('../utils/knex').upsert;
const updateBeerStyles = require('./update_beerstyles');


const CHECKIN_QUERY_COUNT = 25;

const toCheckin = item => ({
  id: item.checkin_id,
  checkin_time: item.created_at,
  beer_id: item.beer.bid,
  venue_id: item.venue.venue_id
});

const toBeer = item => ({
  id: item.beer.bid,
  name: item.beer.beer_name,
  description: item.beer.beer_description,
  brewery: item.brewery.brewery_name,
  country: item.brewery.country_name,
  abv: item.beer.beer_abv,
  label_url: item.beer.beer_label,
  beerstyle_id: item.beer.beer_style_id
});

const toVenue = item => ({
  id: item.venue.venue_id,
  name: item.venue.venue_name,
  address: item.venue.location.venue_address,
  category: item.venue.primary_category,
  lat: item.venue.location.lat,
  lng: item.venue.location.lng
});

const fetchCheckins = async (min, max) => {
  let items = await untappd.getCheckins({
    max,
    limit: CHECKIN_QUERY_COUNT
  });

  items = items.filter(item => item.checkin_id > min);

  if (items.length === 0) {
    return {
      data: { beers: [], venues: [], checkins: [] },
      max: min,
      numUpdates: 0
    };
  }

  const beers = _.chain(items).map(toBeer).uniqBy('id').value();
  const venues = _.chain(items).map(toVenue).uniqBy('id').value();
  const checkins = items.map(toCheckin);

  return {
    data: { beers, venues, checkins },
    max: _.last(checkins).id,
    numUpdates: checkins.length
  };
};

const combineResultsData = (a, b) => {
  if (b == null) return a;
  if (a == null) return b;
  return {
    beers: a.beers.concat(b.beers),
    venues: a.venues.concat(b.venues),
    checkins: a.checkins.concat(b.checkins)
  };
};

/**
 * Fetches new checkins from Untappd API and stores the checkins, beers and venues into the database.
 * @return {Promise} [description]
 */
module.exports = async logger => {
  logger.info('Updating checkins...');

  const latestCheckin = await knex('checkins').orderBy('id', 'desc').first();
  const min = latestCheckin != null ? latestCheckin.id : null;

  let data;
  let max;

  if (min == null) {
    logger.info('No previous checkins found. Updating beer styles and fetching up to 250 latest checkins');
    await updateBeerStyles(logger);
    let queryCount = 0;
    do {
      const results = await fetchCheckins(min, max); // eslint-disable-line no-await-in-loop
      data = combineResultsData(data, results.data);
      max = results.max;
      queryCount += 1;
    } while (queryCount < 10);
  } else {
    do {
      const results = await fetchCheckins(min, max); // eslint-disable-line no-await-in-loop
      data = combineResultsData(data, results.data);
      max = results.max;
      if (results.numUpdates < CHECKIN_QUERY_COUNT) break;
    } while (max > min);
  }

  await knex.transaction(async trx => {
    await Promise.all(data.beers.map(beer => upsert('beers', { id: beer.id }, beer, trx)));
    await Promise.all(data.venues.map(venue => upsert('venues', { id: venue.id }, venue, trx)));
    await Promise.all(data.checkins.map(checkin => upsert('checkins', { id: checkin.id }, checkin, trx)));
  });

  logger.info(`Updated ${data.beers.length} beers.`);
  logger.info(`Updated ${data.venues.length} venues.`);
  logger.info(`Added ${data.checkins.length} new checkins.`);

  logger.info('Updating checkins done.');
};
