import { createResponse } from './utils/lambda';
import { getCheckins } from './utils/untappd';


const lastFetchedCheckInId = null;

const mapToCheckIn = item => ({
  id: item.checkin_id,
  created_at: item.created_at,
  beer_id: item.beer.bid,
  venue_id: item.venue.venue_id
});

const mapToBeer = item => ({
  id: item.beer.bid,
  name: item.beer.beer_name,
  description: item.beer.beer_description,
  brewery: item.brewery.brewery_name,
  country: item.brewery.country_name,
  abv: item.beer.abv
});

const mapToVenue = item => ({
  id: item.venue.venue_id,
  name: item.venue.venue_name,
  address: item.venue.location.venue_address,
  lat: item.venue.location.lat,
  lng: item.venue.location.lng
});


/**
 * Fetches new check-ins from Untappd API and stores the data into DynamoDB.
 */
export const update = (event, context, callback) => {
  getCheckins({
    after: lastFetchedCheckInId
  }).then(res => {
    const checkins = res.items.map(mapToCheckIn);
    const beers = res.items.map(mapToBeer);
    const venues = res.items.map(mapToVenue);
    callback(null, createResponse({ checkins, beers, venues }));
  }).catch(err => {
    callback(err, null);
  });
};
