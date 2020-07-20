import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarJS from 'calendarjs';
import Month from './Month.jsx';
import * as monthHelper from './../util/monthHelper.jsx'
import { render } from 'react-dom';
  
const Calendar = props => {

  const {firstDay, initialDate, timeslots, timeslotProps, locale, classRoot} = props

  const renderMonth = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedTimeslots, setSelectedTimeslots] = useState([]);
    const { timeslots, initialDate } = props
    const cal = new CalendarJS(currentDate.year(), currentDate.month() + 1);
    const weeks = cal.generate();
    return (
      <Month
        currentDate = { currentDate }
        initialDate = { moment(initialDate) }
        weeks = { weeks }
        onWeekOutOfMonth = { setCurrentDate }
        onTimeslotClick = { monthHelper._onTimeslotClick.bind(this) }
        timeslots = { timeslots }
        timeslotProps = { timeslotProps }
        selectedTimeslots = { selectedTimeslots }
        disabledTimeslots = { [] }
        classRoot = { classRoot }
        locale = { locale }
      />
    );
  }

  return (
    <div className = {classRoot}>
      {renderMonth()}
      {/* this._renderActions() }
      { this._renderMonth() }
      { this._renderInputs() */ }
    </div>
  );
}

export default Calendar

Calendar.defaultProps = {
  disabledTimeslots: [],
  maxTimeslots: 1,
  inputProps: {
    names: {},
  },
  startDateInputProps: {},
  endDateInputProps: {},
  locale: 'en'
};

/**
 * @type {String} initialDate:  The initial date in which to place the calendar. Must be MomentJS parseable.
 * @type {Array} timeslots:  An array of timeslots to be displayed in each day.
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Array} disabledTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Integer} maxTimexlots: maximum ammount of timeslots to select.
//  * @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
 * @type {Object} startDateInputProps: properties for the startDate Inputs. Includes name, class, type (hidden, text...)
 * @type {Object} endDateInputProps: properties for the endDate Inputs. Includes name, class, type (hidden, text...)
 * @type {String} classRoot: A string to use as css-class root.
 * @type {String} locale: country language code.
 */
Calendar.propTypes = {
  initialDate: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  maxTimeslots: PropTypes.number,
  // renderDays: PropTypes.object,
  startDateInputProps: PropTypes.object,
  endDateInputProps: PropTypes.object,
  onSelectTimeslot: PropTypes.func,
  classRoot: PropTypes.string.isRequired,
  locale: PropTypes.string
};
