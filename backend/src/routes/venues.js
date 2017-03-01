const moment = require('moment');
const knex = require('../knex');
const untappd = require('../utils/untappd');


const getVenues = {
  method: 'GET',
  path: '/api/venues',
  config: {
    description: 'Retrieves all venues'
  },
  handler(request, reply) {
    reply(knex.select('id', 'name').from('venues').whereIn('category', untappd.VALID_VENUE_TYPES).orderBy('name'));
  }
};

const populateBeer = async checkin => {
  const beer = await knex('beers').where('id', checkin.beer_id).first();
  const beerstyle = await knex.select('name').from('beerstyles').where('id', beer.beerstyle_id).first();
  return Object.assign({
    sightings: checkin.sightings,
    latest_sighting: checkin.latest_sighting,
    beerstyle_name: beerstyle.name
  }, beer);
};

const getVenueBeers = {
  method: 'GET',
  path: '/api/venues/{id}/beers',
  config: {
    description: 'Retrieves recommended beers for a venue'
  },
  async handler(request, reply) {
    const results = await knex('checkins')
      .select('beer_id', 'venue_id')
      .count('checkins.id as sightings')
      .max('checkin_time as latest_sighting')
      .leftJoin('beers', 'checkins.beer_id', 'beers.id')
      .leftJoin('venues', 'checkins.venue_id', 'venues.id')
      .where('beers.avg_rating', '>', 0)
      .andWhere('checkins.venue_id', request.params.id)
      .andWhere('checkin_time', '>=', moment().subtract(2, 'weeks'))
      .orderBy('beers.avg_rating', 'desc')
      .groupBy('beer_id', 'venue_id', 'beers.avg_rating')
      .limit(50);

    reply(Promise.all(results.map(populateBeer)));
  }
};

module.exports = [getVenues, getVenueBeers];
