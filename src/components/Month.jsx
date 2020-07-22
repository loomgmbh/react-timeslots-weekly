import React, {useState} from 'react'
import PropTypes from 'prop-types';
import helpers from './../util/helpers.js';
import CalendarJS from 'calendarjs';
import Week from './Week.jsx';
import Calendar from 'react-calendar'

const Month = props => {
  const {
    // weeks, 
    currentDate, 
    initialDate, 
    timeslots, 
    renderDays,
    onWeekOutOfMonth,
    timeslotProps, 
    selectedTimeslots, 
    disabledTimeslots, 
    classRoot,
    locale
  } = props
  // console.log(currentDate)
  
  const cal = new CalendarJS(currentDate.year(), currentDate.month() + 1);
  const weeks = cal.generate();

  const [currentWeekIndex, setCurrentWeekIndex] = useState(helpers.getStartingWeek(currentDate, weeks));
  const classRootModified = `${classRoot}--month`

  const _onPrevWeekClicked = () => {
    if (currentWeekIndex - 1 >= 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
    else if (onWeekOutOfMonth) {
      // setCurrentWeekIndex(0)
      const firstDayOfPrevWeek = helpers.getMomentFromCalendarJSDateElement(weeks[0]).clone().subtract(1, 'days');
      onWeekOutOfMonth(firstDayOfPrevWeek);
    }
  }
  
  const _onNextWeekClicked = () => {
    if (currentWeekIndex + 1 < weeks.length) {
      let next = currentWeekIndex + 1
      setCurrentWeekIndex(next)
      console.log('cur week index', currentWeekIndex)
    }
    else {
      console.log('out of month', currentWeekIndex)      
      const lastDayIndex = weeks[currentWeekIndex].length - 1;
      const lastDay = weeks[currentWeekIndex][lastDayIndex]
      const momentDay = helpers.getMomentFromCalendarJSDateElement(lastDay, locale)
      const firstDayOfNextWeek = momentDay.clone().add(1, 'days');

      console.log(lastDay, momentDay)
      // console.log(lastDay, firstDayOfNextWeek)
      onWeekOutOfMonth(firstDayOfNextWeek);
    }

  }

  const _renderActions = props => {
    // console.log(weeks, currentWeekIndex)
    const currentWeek = weeks[currentWeekIndex] ?? weeks[0];
    const startDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[0], locale);
    const endDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[currentWeek.length - 1], locale);
    const actionTitle = `${startDate.local('de').format('D. MMMM')} - ${endDate.format('D. MMMM')} ${endDate.format('Y')}`;
    const actionClasses = `${classRootModified}__action ${classRootModified}__action-element ${classRootModified}__action-element--left`
    const nextClasses = `${classRootModified}__action ${classRootModified}__action-element ${classRootModified}__action-element--right`
    return (
      <div className = {`${classRootModified}__actions`}>
        <button className='btn btn-booking'
          className = {actionClasses} 
          onClick = { _onPrevWeekClicked.bind(this)}
        >
          &#8249;
        </button>
        <h5 className = {`${classRootModified}__action ${classRootModified}__action-title`}>
          { actionTitle }
        </h5>
        <button
          className = {nextClasses}
          onClick = { _onNextWeekClicked.bind(this) }
        >
          &#8250;
        </button>
      </div>
    );
  }
  
  const _renderWeek = props => {
    return (
      <Week
        weekToRender = { weeks[currentWeekIndex] }
        onTimeslotClick = { _onTimeslotClick.bind(this) }
        initialDate = { initialDate }
        timeslots = { timeslots }
        timeslotProps = { timeslotProps }
        selectedTimeslots = { selectedTimeslots }
        disabledTimeslots = { disabledTimeslots }
        // renderDays = { renderDays }
        classRoot = { classRoot }
        locale = { locale }
      />
    );
  }
  
  const _onTimeslotClick = (timeslot) => {
    const { onTimeslotClick } = props
    onTimeslotClick(timeslot);
  }
  
  // const componentWillReceiveProps = (nextProps) => {
  //   this.setState({
  //     currentWeekIndex: this.getStartingWeek(nextProps.currentDate, nextProps.weeks),
  //   });
  // }

  return (
    <div className = {classRootModified}>
    { _renderActions()}
    { _renderWeek() }
     <div>
      <h3>Week {currentWeekIndex} of {weeks.length}</h3>
      
     </div>
    </div>
  );
}

export default Month

/**
* @type {Object} currentDate: Base currentDate to get the month from - Usually first day of the month
* @type {Array} weeks: A list of weeks based on calendarJS
* @type {Function} onWeekOutOfMonth: A callback to call when user goes out of the month
* @type {Function} onTimeslotClick: Function to be excecuted when clicked.
* @type {Object} initialDate: Moment JS Date used to initialize the Calendar and which progresses further into the tree.
* @type {Array} timeslots: An array of timeslots to be displayed in each day.
* @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
* @type {Array} selectedTimeslots: Selected Timeslots Set used further into the tree to add the classes needed to when renderizing timeslots.
* @type {Array} DisabledTimeslots: Disabled Timeslots Set used further into the tree to add the classes needed to when renderizing timeslots.
* @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
* @type {String} classRoot: A string to use as css-class root.
* @type {String} locale: country language code.
 */
Month.propTypes = {
  currentDate: PropTypes.object.isRequired,
  // weeks: PropTypes.array.isRequired,
  onWeekOutOfMonth: PropTypes.func,
  onTimeslotClick: PropTypes.func,
  initialDate: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  // renderDays: PropTypes.object,
  classRoot: PropTypes.string.isRequired,
  locale: PropTypes.string
};
