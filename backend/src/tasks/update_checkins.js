const _ = require('lodash');

const untappd = require('../utils/untappd');
const knex = require('../knex');
const upsert = require('../utils/knex').upsert;


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
  beerstyle_id: item.beer.beer_style_id
});

const toVenue = item => ({
  id: item.venue.venue_id,
  name: item.venue.venue_name,
  address: item.venue.location.venue_address,
  lat: item.venue.location.lat,
  lng: item.venue.location.lng
});

/**
 * Fetches new checkins from Untappd API and stores the checkins, beers and venues into the database.
 * @return {Promise} [description]
 */
module.exports = async () => {
  console.log('Updating checkins.');

  const latestCheckin = await knex('checkins').orderBy('id', 'DESC').first();
  const after = latestCheckin != null ? latestCheckin.id : null;

  const items = await untappd.getCheckins({ after });

  if (items.length === 0) {
    console.log('No new checkins.');
    return;
  }

  const beers = _.chain(items).map(toBeer).uniqBy('id').value();
  const venues = _.chain(items).map(toVenue).uniqBy('id').value();
  const checkins = items.map(toCheckin);

  await knex.transaction(async trx => {
    await Promise.all(beers.map(beer => upsert('beers', { id: beer.id }, beer, trx)));
    await Promise.all(venues.map(venue => upsert('venues', { id: venue.id }, venue, trx)));
    await Promise.all(checkins.map(checkin => upsert('checkins', { id: checkin.id }, checkin, trx)));
  });

  console.log(`Updated ${beers.length} beers.`);
  console.log(`Updated ${venues.length} venues.`);
  console.log(`Added ${checkins.length} new checkins.`);
  console.log('Updating checkins done.');
};
