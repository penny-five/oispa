import moment from 'moment';


/**
 * Formats past dates. This exists because the finnish localization for
 * moment.js sucks.
 */
export const formatPastDate = (i18n, pastDate) => {
  const now = moment();

  const minutesAgo = now.diff(pastDate, 'minutes');
  if (minutesAgo < 60) {
    return i18n('date.minutes_ago', { minutes: minutesAgo });
  }

  const hoursAgo = now.diff(pastDate, 'hours');

  if (hoursAgo <= 6) {
    return i18n('date.hours_ago', { hours: hoursAgo });
  }

  const yesterday = now.clone().subtract(1, 'days');
  if (yesterday.isSame(pastDate, 'day')) {
    return i18n('date.yesterday');
  }

  if (hoursAgo <= 24) {
    return i18n('date.hours_ago', { hours: hoursAgo });
  }

  const daysAgo = now.startOf('day').diff(pastDate.startOf('day'), 'days');
  return i18n('date.days_ago', { days: daysAgo });
};
