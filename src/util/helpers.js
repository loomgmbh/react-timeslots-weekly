import moment from 'moment';

let helpers = {};
export default helpers;

helpers.getMomentFromCalendarJSDateElement = (dayElement, locale = 'en') => {
  return moment([
    dayElement.year,
    dayElement.month - 1,
    dayElement.date,
  ]).locale(locale)
};
