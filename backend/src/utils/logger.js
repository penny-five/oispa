const _ = require('lodash');
const bucker = require('bucker').createLogger({ console: true });


function log(buckerFn, tag, ...message) {
  buckerFn.call(bucker, `[${tag.toUpperCase()}] ${message.join(' ')}`);
}

module.exports = {
  create: (tag = 'default') => ({
    info: _.partial(log, bucker.info, tag),
    debug: _.partial(log, bucker.debug, tag),
    warn: _.partial(log, bucker.warn, tag),
    error: _.partial(log, bucker.error, tag)
  })
};
