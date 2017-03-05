const _ = require('lodash');


const sanitizeExternalUrl = url => {
  if (_.isEmpty(url)) return null;
  if (url.startsWith('http')) return url;
  return `http://${url}`;
};

module.exports = {
  sanitizeExternalUrl
};
