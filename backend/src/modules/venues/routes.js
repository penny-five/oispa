const Venues = require('../../models/venues');


const getVenue = {
  method: 'GET',
  path: '/api/venues/{id}',
  config: {
    description: 'Retrieves venue information and recommendations for a venue'
  },
  async handler(request, reply) {
    const id = request.params.id;
    const venue = await Venues.getVenueInformation(id);
    const recommendations = await Venues.getVenueRecommendations({ id, count: 50 });
    reply({
      venue,
      recommendations
    });
  }
};

module.exports = [
  getVenue
];
