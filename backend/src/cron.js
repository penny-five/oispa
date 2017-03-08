const CronJob = require('cron').CronJob;

const tasks = require('./modules/tasks');


const jobs = [
  /* runs once a day */
  new CronJob('0 0 * * *', tasks.updateBeerstyles),
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
