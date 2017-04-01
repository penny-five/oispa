const _ = require('lodash');
const Joi = require('joi');

const config = require('../../config');
const Areas = require('../../models/areas');


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
  handler(request, reply) {
    reply(Areas.getAreaVenues(request.params.id));
  }
};

const getAreaRecommendations = {
  method: 'GET',
  path: '/api/areas/{id}/recommendations',
  config: {
    description: 'Retrieves beer recommendations for an area, optionally filtered by beer category',
    validate: {
      params: {
        id: Joi.any().valid(_.values(config.AREAS).map(area => area.id))
      },
      query: {
        category: Joi.string()
      }
    }
  },
  handler(request, reply) {
    reply(Areas.getAreaRecommendations({
      areaId: request.params.id,
      category: request.query.category
    }));
  }
};

module.exports = [
  getAllAreas,
  getAreaVenues,
  getAreaRecommendations
];
