const CronJob = require('cron').CronJob;

const tasks = require('./tasks');

const jobs = [
  /* runs at every 30th minute */
  new CronJob('*/30 * * * *', tasks.updateBeerRatings),
  /* runs at every 15th minute */
  new CronJob('*/15 * * * *', tasks.updateCheckins)
];

module.exports = {
  start() {
    jobs.forEach(job => job.start());
  },
  stop() {
    jobs.forEach(job => job.stop());
  }
};
