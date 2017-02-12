const tasks = require('../tasks');

const updateBeerstyles = {
  method: 'PUT',
  path: '/tasks/update_beerstyles',
  handler(request, reply) {
    tasks.updateBeerstyles();
    reply().code(202);
  }
};

const updateCheckins = {
  method: 'PUT',
  path: '/tasks/update_checkins',
  handler(request, reply) {
    reply().code(202);
    process.nextTick(() => tasks.updateCheckins());
  }
};

module.exports = [
  updateBeerstyles,
  updateCheckins
];
