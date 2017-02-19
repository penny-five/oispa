const _ = require('lodash');
const Joi = require('joi');
const moment = require('moment');
const BezierEasing = require('bezier-easing');

const knex = require('../knex');


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
 *  TODO User location should be calculated and taken into account. Venues that are nearby should be preferred.
 */
const sort = venues => _.sortBy(venues, venue => {
  /*
    Rating for a venue is the sum of beer ratings, where each added beer adds less to the
    rating than the one before. This should produce results where few but excellent beers are preferred
    to ones with a large selection of mediocre beers. Beer ratings are also scaled so that truly excellent
    beers have more impact than the ones that are just good.
   */
  const venueRating = venue.beers.reduce((sum, beer, index) => {
    const adjustedBeerRating = BEER_RATING_EASING_FN(beer.avg_rating / 5) * 5;
    return sum + (adjustedBeerRating * (0.20 + (0.80 / (index + 1))));
  }, 0);
  return -venueRating;
});

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
