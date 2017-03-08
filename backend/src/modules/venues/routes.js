const Venues = require('./model');


const getVenueRecommendations = {
  method: 'GET',
  path: '/api/venues/{id}/recommendations',
  config: {
    description: 'Retrieves beer recommendations for a venue'
  },
  handler(request, reply) {
    reply(Venues.getVenueRecommendations(request.params.id));
  }
};

module.exports = [
  getVenueRecommendations
];
