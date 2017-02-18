const knex = require('knex')(require('./knexfile'));
const promiseRetry = require('promise-retry');

const logger = require('./src/utils/logger').create();
const Server = require('./src/server');


const opts = {
  port: process.env.PORT,
  logLevel: 'info'
};

(async () => {
  try {
    await promiseRetry(retry => knex.migrate.latest().catch(retry));
    await new Server().start(opts);
  } catch (err) {
    logger.error(err);
  }
})();
