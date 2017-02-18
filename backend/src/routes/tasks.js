const tasks = require('../tasks');


const updateBeerRatings = {
  method: 'PUT',
  path: '/tasks/update_beer_ratings',
  config: {
    description: 'Runs a task that updates ratings for beers, prioritizing ones that need the update most'
  },
  handler(request, reply) {
    tasks.updateBeerRatings();
    reply().code(202);
  }
};

const updateBeerstyles = {
  method: 'PUT',
  path: '/tasks/update_beerstyles',
  config: {
    description: 'Runs a task that scrapes and updates beer styles from Untappd website'
  },
  handler(request, reply) {
    tasks.updateBeerstyles();
    reply().code(202);
  }
};

const updateCheckins = {
  method: 'PUT',
  path: '/tasks/update_checkins',
  config: {
    description: 'Runs a task that fetches more checkins from Untappd API'
  },
  handler(request, reply) {
    tasks.updateCheckins();
    reply().code(202);
  }
};

module.exports = [
  updateBeerRatings,
  updateBeerstyles,
  updateCheckins
];
