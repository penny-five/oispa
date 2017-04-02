const moment = require('moment');

const knex = require('../knex');
const config = require('../config');


const findByCategoryAndArea = async ({ category, area, limit = 5 }) => {
  const results = await knex('beers')
    .select('beers.id', 'beers.name', 'beers.avg_rating', 'beers.brewery')
    .where('beers.avg_rating', '>', 0)
    .whereIn('beers.id', function() {
      this.select('beer_id')
        .from('checkins')
        .leftJoin('venues', 'checkins.venue_id', 'venues.id')
        .where('checkins.oispa_area', area)
        .andWhere('checkins.checkin_time', '>=', moment().subtract(2, 'weeks'))
        .whereIn('venues.category', config.VALID_VENUE_TYPES);
    })
    .orderBy('beers.avg_rating', 'desc')
    .limit(limit)
    .modify(query => {
      if (category === 'all') {
        query.whereIn('beers.beerstyle_id', function() {
          this.select('id').from('beerstyles').whereNot('category', config.getAllNonAlcoholicCategories());
        });
      } else {
        query.whereIn('beers.beerstyle_id', function() {
          this.select('id').from('beerstyles').where('category', category);
        });
      }
    });
  return results;
};

module.exports = {
  findByCategoryAndArea
};
