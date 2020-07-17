import React, {useState} from 'react'
import PropTypes from 'prop-types';
import helpers from './../util/helpers.js';
import Week from './Week.jsx';



const Month = props => {
  const {
    weeks, 
    currentDate, 
    initialDate, 
    timeslots, 
    renderDays, 
    timeslotProps, 
    selectedTimeslots, 
    disabledTimeslots, 
    classRoot
  } = props
  
  const _getStartingWeek = (currentDate, weeks) => {
    // find out staring week:
    const currentDateWithoutTime = currentDate.startOf('day');
    let startingWeek  = 0;
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

    return startingWeek;
  }
  const [currentWeekIndex, setCurrentWeekIndex] = useState(_getStartingWeek(currentDate, weeks));
  const classRootModified = `${classRoot}--month`

  const _onPrevWeekClicked = () => {
    if (currentWeekIndex - 1 >= 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
    else if (onWeekOutOfMonth) {
      const firstDayOfPrevWeek = helpers.getMomentFromCalendarJSDateElement(weeks[0][0]).clone().subtract(1, 'days');
      onWeekOutOfMonth(firstDayOfPrevWeek);
    }
  }
  
  const _onNextWeekClicked = () => {
    if (currentWeekIndex + 1 < weeks.length) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
    else if (onWeekOutOfMonth) {
      const lastDay = weeks[currentWeekIndex].length - 1;
      const firstDayOfNextWeek = helpers.getMomentFromCalendarJSDateElement(weeks[currentWeekIndex][lastDay]).clone().add(1, 'days');
      onWeekOutOfMonth(firstDayOfNextWeek);
    }
  }

  const _renderActions = props => {
    const currentWeek = weeks[currentWeekIndex];
    const startDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[0]);
    const endDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[currentWeek.length - 1]);
    const actionTitle = `${startDate.format('MMM Do')} - ${endDate.format('MMM Do')}`;
    const actionClasses = `${classRootModified}__action ${classRootModified}__action-element ${classRootModified}__action-element--left`
    return (
      <div className = {`${classRootModified}__actions`}>
        <div className = {actionClasses} onClick = { _onPrevWeekClicked.bind(this) }>
          &#8249;
        </div>
        <div className = "tsc-month__action tsc-month__action-title">
          { actionTitle }
        </div>
        <div className = "tsc-month__action tsc-month__action-element tsc-month__action-element--right" onClick = { _onNextWeekClicked.bind(this) }>
          &#8250;
        </div>
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
        renderDays = { renderDays }
        classRoot = { classRoot }
      />
    );
  }
  
  const _onTimeslotClick = (timeslot) => {
    const { onTimeslotClick } = props
    onTimeslotClick(timeslot);
  }
  
  const componentWillReceiveProps = (nextProps) => {
    this.setState({
      currentWeekIndex: this._getStartingWeek(nextProps.currentDate, nextProps.weeks),
    });
  }

  return (
    <div className = {classRootModified}>
      { _renderActions()}
      { _renderWeek() }
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
 */
Month.propTypes = {
  currentDate: PropTypes.object.isRequired,
  weeks: PropTypes.array.isRequired,
  onWeekOutOfMonth: PropTypes.func,
  onTimeslotClick: PropTypes.func,
  initialDate: PropTypes.object.isRequired,
  timeslots: PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  renderDays: PropTypes.object,
  classRoot: PropTypes.string.isRequired
};
