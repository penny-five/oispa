const Joi = require('joi');
const moment = require('moment');

const knex = require('../knex');

/**
 * TODO make a generic version of this function for reuse.
 */
const populate = async checkin => {
  const result = Object.assign({}, checkin);
  result.beer = await knex('beers').where('id', checkin.beer_id);
  result.venue = await knex('venues').where('id', checkin.venue_id);
  delete result.beer_id;
  delete result.venue_id;
  return result;
};

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
    const checkins = await knex('checkins')
      .select('beer_id', 'venue_id')
      .count('checkins.id as sightings')
      .max('checkin_time as latest_checkin')
      .leftJoin('beers', 'checkins.beer_id', 'beers.id')
      .where('checkin_time', '>=', oldestAcceptedCheckinDate)
      .groupBy('beer_id', 'venue_id')
      .orderBy('latest_checkin', 'DESC')
      .modify(query => {
        if (request.query.beerstyle != null) {
          query.andWhere('beers.beerstyle_id', request.query.beerstyle);
        }
      });

    reply(Promise.all(checkins.map(populate)));
  }
};
