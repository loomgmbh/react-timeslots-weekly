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

helpers.update

helpers.getStartingWeek = (currentDate, weeks) => {
  // find out staring week:
  const currentDateWithoutTime = currentDate.startOf('day');
  let startingWeek = 0;
  weeks.some((week, index) => {
    let weekContainsDate = week.some((day) => {
      const momentDay = helpers.getMomentFromCalendarJSDateElement(day);
      return momentDay.format() === currentDateWithoutTime.format();
    });

    if (weekContainsDate) {
      startingWeek = index;
      return weekContainsDate;
    }
  });
  // console.log(startingWeek)
  return startingWeek;
}
