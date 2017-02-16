const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment');

const knex = require('../knex');

const populateBeer = async checkin => {
  const beer = await knex('beers').where('id', checkin.beer_id).first();
  return Object.assign({
    sightings: checkin.sightings,
    latest_sighting: checkin.latest_sighting
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
    description: 'Retrieves beer recommendations, optionally filtered by beer style',
    validate: {
      query: {
        beerstyle: Joi.number().integer().min(1)
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
      .whereNotNull('beers.avg_rating')
      .andWhere('checkin_time', '>=', oldestAcceptedCheckinDate)
      .groupBy('beer_id', 'venue_id', 'beers.avg_rating')
      .orderBy('beers.avg_rating', 'desc')
      .limit(50)
      .modify(query => {
        if (request.query.beerstyle != null) {
          query.andWhere('beers.beerstyle_id', request.query.beerstyle);
        }
      });

    const venues = _.toPairs(groupByVenue(results)).map(populateVenue);
    reply(sort(await Promise.all(venues)));
  }
};
