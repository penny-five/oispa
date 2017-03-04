const _ = require('lodash');
const each = require('promise-each');

const untappd = require('../utils/untappd');
const knex = require('../knex');
const config = require('../config');
const knexUtils = require('../utils/knex');
const updateBeerStyles = require('./update_beerstyles');


const CHECKIN_QUERY_COUNT = 25;

const toCheckin = (area, item) => ({
  id: item.checkin_id,
  checkin_time: item.created_at,
  beer_id: item.beer.bid,
  venue_id: item.venue.venue_id,
  oispa_area: area.id
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

const toVenue = item => (_.isPlainObject(item.venue) ? ({
  id: item.venue.venue_id,
  name: item.venue.venue_name,
  address: item.venue.location.venue_address || null,
  city: item.venue.location.venue_city || null,
  category: item.venue.primary_category,
  lat: item.venue.location.lat,
  lng: item.venue.location.lng
}) : null);

const fetchCheckins = async (area, min, max) => {
  let items = await untappd.getCheckins({
    area,
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
  const venues = _.chain(items).map(toVenue).compact().uniqBy('id').value();
  const checkins = items.map(_.partial(toCheckin, area));

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

const updateAreaCheckins = logger => async area => {
  logger.info(`Updating checkins for ${area.id}...`);

  const latestCheckin = await knex('checkins').where('oispa_area', area.id).orderBy('id', 'desc').first();
  const min = latestCheckin != null ? latestCheckin.id : null;

  let data;
  let max;

  if (min == null) {
    logger.info(`No previous checkins found for ${area.id}. Fetching up to 100 latest checkins`);
    let queryCount = 0;
    do {
      const results = await fetchCheckins(area, min, max); // eslint-disable-line no-await-in-loop
      data = combineResultsData(data, results.data);
      max = results.max;
      queryCount += 1;
    } while (queryCount < 4);
  } else {
    do {
      const results = await fetchCheckins(area, min, max); // eslint-disable-line no-await-in-loop
      data = combineResultsData(data, results.data);
      max = results.max;
      if (results.numUpdates < CHECKIN_QUERY_COUNT) break;
    } while (max > min);
  }

  if (data.checkins.length === 0) {
    logger.info(`No new checkins for ${area.id}`);
    return;
  }

  await knex.transaction(async trx => {
    await knexUtils.batchUpsert(data.beers.map(beer => ({
      table: 'beers',
      where: { id: beer.id },
      values: beer,
      transaction: trx
    })));
    await knexUtils.batchUpsert(data.venues.map(venue => ({
      table: 'venues',
      where: { id: venue.id },
      values: venue,
      transaction: trx
    })));
    await knexUtils.batchUpsert(data.checkins.map(checkin => ({
      table: 'checkins',
      where: { id: checkin.id },
      values: checkin,
      transaction: trx
    })));
  });

  logger.info(`Updated ${data.beers.length} beers for ${area.id}`);
  logger.info(`Updated ${data.venues.length} venues for ${area.id}`);
  logger.info(`Added ${data.checkins.length} new checkins for ${area.id}`);
};

/**
 * Fetches new checkins from Untappd API and stores the checkins, beers and venues into the database.
 * @return {Promise} [description]
 */
module.exports = async logger => {
  logger.info('Updating checkins...');

  const hasNoBeerstyles = await knexUtils.isEmpty('beerstyles');
  if (hasNoBeerstyles) {
    logger.info('No beer styles found. Updating beer styles before fetching checkins');
    await updateBeerStyles(logger);
  }

  await each(updateAreaCheckins(logger))(_.values(config.AREAS));

  logger.info('Updating checkins done');
};
