const _ = require('lodash');
const Joi = require('joi');

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
      .where('checkins.oispa_area', request.params.id)
      .whereIn('venues.category', untappd.VALID_VENUE_TYPES)
      .orderBy('venues.name');

    reply(venues);
  }
};

module.exports = [getAllAreas, getAreaVenues];
