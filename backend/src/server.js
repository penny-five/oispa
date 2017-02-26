const Glue = require('glue');
const Joi = require('joi');

const createManifest = require('./manifest');
const cron = require('./cron');
const logger = require('./utils/logger').create();


const defaults = {
  port: 8080,
  logLevel: 'debug'
};

const serverSchema = Joi.object().keys({
  port: Joi.number().min(0).max(65535),
  logLevel: Joi.string().valid('none', 'debug', 'info', 'warn', 'error')
});

function Server(opts) {
  const config = Object.assign({}, defaults, opts);

  const result = Joi.validate(config, serverSchema);
  if (result.error != null) {
    logger.error('Invalid configuration object');
    throw new Error(result.error);
  }

  const manifest = createManifest(config);

  return {
    async start() {
      const server = await Glue.compose(manifest, { relativeTo: __dirname });
      await server.start();
      if (process.env.NODE_ENV == 'production') {
        console.log('running cron');
        cron.start();
      }
      logger.info(`Oispa backend started at ${server.info.uri}`);
    }
  };
}

module.exports = Server;
