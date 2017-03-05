const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment');
const BezierEasing = require('bezier-easing');

const knex = require('../knex');
const config = require('../config');


const VALID_VENUE_TYPES = [
  'Arts & Entertainment',
  'Nightlife Spot',
  'Food'
];

const BEER_RATING_EASING_FN = BezierEasing(0.75, 0.00, 0.76, 1.00);

const populateBeer = async checkin => {
  const beer = await knex('beers').where('id', checkin.beer_id).first();
  const beerstyle = await knex.select('name').from('beerstyles').where('id', beer.beerstyle_id).first();
  return Object.assign({
    sightings: checkin.sightings,
    latest_sighting: checkin.latest_sighting,
    beerstyle_name: beerstyle.name,
    untappd_url: beer.slug != null ? `https://untappd.com/b/${beer.slug}/${beer.id}` : null
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
 *  TODO User location should be calculated and taken into account. Venues that are nearby should be preferred.
 */
const sort = venues => _.sortBy(venues, venue => {
  /*
    Rating for a venue is the sum of beer ratings, where each added beer adds less to the rating than
    the one before. This should produce results where venues with few but excellent beers are preferred
    to ones with a large selection of mediocre beers. Beer ratings are also scaled so that truly excellent
    beers have more impact than the ones that are "only" very good.
   */
  const venueRating = venue.beers.reduce((sum, beer, index) => {
    const adjustedBeerRating = BEER_RATING_EASING_FN(beer.avg_rating / 5) * 5;
    return sum + (adjustedBeerRating * (0.20 + (0.80 / (index + 1))));
  }, 0);
  return -venueRating;
});

module.exports = {
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
  async handler(request, reply) {
    const results = await knex('checkins')
      .select('checkins.beer_id', 'checkins.venue_id')
      .count('checkins.id as sightings')
      .max('checkins.checkin_time as latest_sighting')
      .leftJoin('beers', 'checkins.beer_id', 'beers.id')
      .leftJoin('venues', 'checkins.venue_id', 'venues.id')
      .whereIn('venues.category', VALID_VENUE_TYPES)
      .andWhere('beers.avg_rating', '>', 0)
      .andWhere('checkins.oispa_area', request.params.id)
      .andWhere('checkins.checkin_time', '>=', moment().subtract(2, 'weeks'))
      .groupBy('checkins.beer_id', 'checkins.venue_id', 'beers.avg_rating')
      .orderBy('beers.avg_rating', 'desc')
      .limit(50)
      .modify(query => {
        if (request.query.category != null && request.query.category !== 'all') {
          query.whereIn('beers.beerstyle_id', function() {
            this.select('id').from('beerstyles').where('category', request.query.category);
          });
        }
      });

    const venues = _.toPairs(groupByVenue(results)).map(populateVenue);
    reply(sort(await Promise.all(venues)));
  }
};
