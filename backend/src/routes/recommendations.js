const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment');

const knex = require('../knex');


const VALID_VENUE_TYPES = [
  'Arts & Entertainment',
  'Nightlife Spot',
  'Food'
];

const populateBeer = async checkin => {
  const beer = await knex('beers').where('id', checkin.beer_id).first();
  const beerstyle = await knex.select('name').from('beerstyles').where('id', beer.beerstyle_id).first();
  return Object.assign({
    sightings: checkin.sightings,
    latest_sighting: checkin.latest_sighting,
    beerstyle_name: beerstyle.name
  }, beer);
};

const populateVenue = async ([venueId, checkins]) => {
  const result = {};
  result.venue = await knex('venues').where('id', venueId).first();
  result.beers = await Promise.all(checkins.map(populateBeer));
  return result;
};

const groupByVenue = checkins => _.groupBy(checkins, checkin => checkin.venue_id);

/**
 *  TODO implement proper sorting algorithm. Venues that have few high ranked beers should be ranked higher
 *  than venues that have tons of average beers.
 */
const sort = venues => venues;

module.exports = {
  method: 'GET',
  path: '/recommendations',
  config: {
    description: 'Retrieves beer recommendations, optionally filtered by beer category',
    validate: {
      query: {
        category: Joi.string()
      }
    }
  },
  async handler(request, reply) {
    const oldestAcceptedCheckinDate = moment().subtract(2, 'weeks');
    const results = await knex('checkins')
      .select('beer_id', 'venue_id')
      .count('checkins.id as sightings')
      .max('checkin_time as latest_sighting')
      .leftJoin('beers', 'checkins.beer_id', 'beers.id')
      .leftJoin('venues', 'checkins.venue_id', 'venues.id')
      .whereNotNull('beers.avg_rating')
      .whereIn('venues.category', VALID_VENUE_TYPES)
      .andWhere('checkin_time', '>=', oldestAcceptedCheckinDate)
      .groupBy('beer_id', 'venue_id', 'beers.avg_rating')
      .orderBy('beers.avg_rating', 'desc')
      .limit(50)
      .modify(query => {
        if (request.query.category != null) {
          query.whereIn('beers.beerstyle_id', function() {
            this.select('id').from('beerstyles').where('category', request.query.category);
          });
        }
      });

    const venues = _.toPairs(groupByVenue(results)).map(populateVenue);
    reply(sort(await Promise.all(venues)));
  }
};
