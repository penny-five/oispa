const _ = require('lodash');
const https = require('https');
const qs = require('querystring');


const get = opts => new Promise((resolve, reject) => {
  const params = {
    hostname: opts.hostname,
    path: `/${opts.path}?${qs.stringify(_.omitBy(opts.query, _.isNil))}`
  };

  https.get(params, res => {
    let body = '';
    res.on('data', data => { body += data; });
    res.on('end', () => resolve({
      headers: res.headers,
      body: JSON.parse(body)
    }));
  }).on('error', reject);
});

module.exports = {
  get
};
