const _ = require('lodash');
const scrapeIt = require('scrape-it');
const he = require('he');

const knex = require('../../knex');
const upsert = require('../../utils/knex').upsert;
const findCategoryForBeerStyle = require('../../config').findCategoryForBeerStyle;


const SCRAPE_URL = 'https://untappd.com/beer/top_rated';
const SCRAPE_SPEC = {
  items: {
    listItem: '#filter_picker option',
    data: {
      id: {
        attr: 'value'
      },
      name: {
        how: 'html'
      }
    }
  }
};

/**
 * Scrapes beer styles from a <select> element on Untappd website and updates
 * the beer styles stored in the database.
 */
module.exports = async logger => {
  logger.info('Updating beer styles...');

  const data = await scrapeIt(SCRAPE_URL, SCRAPE_SPEC);

  /* First item in <select> element is an empty option and needs to be dropped */
  let items = _.drop(data.items);

  items = items.map(item => ({
    id: parseInt(item.id, 10),
    name: he.decode(item.name),
    category: findCategoryForBeerStyle(item)
  }));

  /* Used by Untappd, but not returned from scraping, so has to be added manually */
  items = items.concat({
    id: 0,
    name: 'Other',
    category: 'exotic'
  });

  await knex.transaction(async trx => {
    await Promise.all(items.map(item => upsert('beerstyles', { id: item.id }, item, trx)));
  });

  logger.info('Beer styles updated');
};
