import _ from 'lodash';
import https from 'https';
import qs from 'querystring';

export const get = opts => new Promise((resolve, reject) => {
  const params = {
    hostname: opts.hostname,
    path: `/${opts.path}?${qs.stringify(_.omitBy(opts.query, _.isNil))}`
  };

  console.info('GET', params);

  https.get(params, res => {
    let body = '';
    res.on('data', data => { body += data; });
    res.on('end', () => resolve(JSON.parse(body)));
  }).on('error', reject);
});
