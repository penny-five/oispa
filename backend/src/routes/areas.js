const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment');

const config = require('../config');
const untappd = require('../utils/untappd');
const knex = require('../knex');


const getAllAreas = {
  method: 'GET',
  path: '/api/areas',
  config: {
    description: 'Returns all areas supported by Oispa'
  },
  handler(request, reply) {
    reply(_.values(config.AREAS).map(area => ({
      id: area.id,
      abbr: area.abbr,
      name: area.name
    })));
  }
};

const getAreaVenues = {
  method: 'GET',
  path: '/api/areas/{id}/venues',
  config: {
    description: 'Retrieves all venues for an area',
    validate: {
      params: {
        id: Joi.any().valid(_.values(config.AREAS).map(area => area.id))
      }
    }
  },
  async handler(request, reply) {
    const venues = await knex('checkins')
      .distinct('venues.id', 'venues.name', 'venues.address', 'venues.city')
      .leftJoin('venues', 'checkins.venue_id', 'venues.id')
      .leftJoin('beers', 'checkins.beer_id', 'beers.id')
      .whereIn('venues.category', untappd.VALID_VENUE_TYPES)
      .andWhere('beers.avg_rating', '>', 0)
      .andWhere('checkins.checkin_time', '>=', moment().subtract(2, 'weeks'))
      .andWhere('checkins.oispa_area', request.params.id)
      .orderBy('venues.name');

    reply(venues);
  }
};

module.exports = [getAllAreas, getAreaVenues];
