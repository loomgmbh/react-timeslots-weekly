import React, {useState} from 'react'
import PropTypes from 'prop-types';
import helpers from './../util/helpers.js';
import Week from './Week.jsx';

const _renderActions = () => {
  const { weeks, currentWeekIndex } = props
  const currentWeek = weeks[currentWeekIndex];
  const startDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[0]);
  const endDate = helpers.getMomentFromCalendarJSDateElement(currentWeek[currentWeek.length - 1]);
  const actionTitle = `${startDate.format('MMM Do')} - ${endDate.format('MMM Do')}`;

  return (
    <div className = "tsc-month__actions">
      <div className = "tsc-month__action tsc-month__action-element tsc-month__action-element--left" onClick = { this._onPrevWeekClicked.bind(this) }>
        &#8249;
      </div>
      <div className = "tsc-month__action tsc-month__action-title">
        { actionTitle }
      </div>
      <div className = "tsc-month__action tsc-month__action-element tsc-month__action-element--right" onClick = { this._onNextWeekClicked.bind(this) }>
        &#8250;
      </div>
    </div>
  );
}

const _renderWeek = (currentWeekIndex) => {
  const {
    weeks,
    initialDate,
    timeslots,
    timeslotProps,
    selectedTimeslots,
    disabledTimeslots,
    renderDays,
  } = props

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
    />
  );
}

const _onTimeslotClick = (timeslot) => {
  const { onTimeslotClick } = props
  onTimeslotClick(timeslot);
}

/**
 * Handles prev week button click.
 */
const _onPrevWeekClicked = () => {
  const {
    currentWeekIndex,
  } = this.state;

  const {
    onWeekOutOfMonth,
    weeks,
  } = this.props;

  if (currentWeekIndex - 1 >= 0) {
    this.setState({
      currentWeekIndex: currentWeekIndex - 1,
    });
  }
  else if (onWeekOutOfMonth) {
    const firstDayOfPrevWeek = helpers.getMomentFromCalendarJSDateElement(weeks[0][0]).clone().subtract(1, 'days');
    onWeekOutOfMonth(firstDayOfPrevWeek);
  }
}

/**
 * Handles next week button click.
 */
_onNextWeekClicked() {
  const {
    currentWeekIndex,
  } = this.state;

  const {
    weeks,
    onWeekOutOfMonth,
  } = this.props;

  if (currentWeekIndex + 1 < weeks.length) {
    this.setState({
      currentWeekIndex: currentWeekIndex + 1,
    });
  }
  else if (onWeekOutOfMonth) {
    const lastDay = weeks[currentWeekIndex].length - 1;
    const firstDayOfNextWeek = helpers.getMomentFromCalendarJSDateElement(weeks[currentWeekIndex][lastDay]).clone().add(1, 'days');
    onWeekOutOfMonth(firstDayOfNextWeek);
  }
}

componentWillReceiveProps(nextProps) {
  this.setState({
    currentWeekIndex: this._getStartingWeek(nextProps.currentDate, nextProps.weeks),
  });
}

const Month = props => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
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

  return (
    <div className = "tsc-month">
      { this._renderActions() }
      { this._renderWeek() }
    </div>
  );
}



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
};
