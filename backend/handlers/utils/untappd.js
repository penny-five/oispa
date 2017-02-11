import { get } from './https';


const UNTAPPD_API_HOST = 'api.untappd.com';
const UNTAPPD_API_VERSION = 'v4';

/* Coordinates for Hämeensilta, Tampere, Finland */
const THE_PUB_LAT = 61.497993;
const THE_PUB_LNG = 23.763627;
/* Fetch only for central Tampere. Sorry, Hervanta. */
const THE_PUB_RADIUS = 3;
const THE_PUB_RADIUS_FORMAT = 'km';

const sendUntappdRequest = opts => get({
  hostname: UNTAPPD_API_HOST,
  path: `${UNTAPPD_API_VERSION}/${opts.path}`,
  query: Object.assign({}, opts.query, {
    client_id: process.env.UNTAPPD_CLIENT_ID,
    client_secret: process.env.UNTAPPD_CLIENT_SECRET
  })
});

export const getCheckins = opts => sendUntappdRequest({
  path: 'thepub/local',
  query: {
    min_id: opts.after,
    lat: THE_PUB_LAT,
    lng: THE_PUB_LNG,
    radius: THE_PUB_RADIUS,
    dist_pref: THE_PUB_RADIUS_FORMAT
  }
}).then(request => request.response.checkins);
