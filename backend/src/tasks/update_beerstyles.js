const _ = require('lodash');
const scrapeIt = require('scrape-it');

const knex = require('../knex');


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
module.exports = async () => {
  const data = await scrapeIt({
    url: SCRAPE_URL,
    encoding: 'UTF-8'
  }, SCRAPE_SPEC);

  /* First item in <select> element is an empty option and needs to be dropped */
  let items = _.drop(data.items);

  items = items.map(item => ({
    id: parseInt(item.id, 10),
    name: item.name
  }));

  let fromResult, toResult;
  await knex.transaction(async trx => {
    fromResult = await trx.del().from('beerstyles');
    toResult = await trx.insert(items).into('beerstyles');
  });
  console.log(`Beer styles updated (count: ${fromResult} -> ${toResult.rowCount})`);
};
