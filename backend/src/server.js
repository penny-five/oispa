const Glue = require('glue');
const Joi = require('joi');

const createManifest = require('./manifest');


const defaults = {
  port: 8080,
  logLevel: 'debug'
};

const schema = Joi.object().keys({
  port: Joi.number().min(0).max(65535),
  logLevel: Joi.string().valid('none', 'debug', 'info', 'warn', 'error')
});

function Server(opts) {
  const config = Object.assign({}, defaults, opts);

  const result = Joi.validate(config, schema);
  if (result.error != null) {
    console.error('Invalid configuration object');
    throw new Error(result.error);
  }

  const manifest = createManifest(config);

  return {
    start() {
      Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
        if (err) throw err;
        server.start(() => {
          console.log(`Oispa backend started at ${server.info.uri}`);
        });
      });
    }
  };
}

module.exports = Server;
