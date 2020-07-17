import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarJS from 'calendarjs';
import Month from './Month.jsx';
import { render } from 'react-dom';

const _renderActions = () => {
  const {
    currentDate,
  } = useState('');

  const actionTitle = `${currentDate.format('MMMM - YYYY')}`;

  return (
    <div className = "tsc-calendar__actions">
      <div className = "tsc-calendar__action tsc-calendar__action-element tsc-calendar__action-element--left" onClick = { this._onGoToPrevMonth.bind(this) }>
        &#8249;
      </div>
      <div className = "tsc-calendar__action tsc-calendar__action-title">
        { actionTitle }
      </div>
      <div className = "tsc-calendar__action tsc-calendar__action-element tsc-calendar__action-element--right" onClick = { this._onGoToNextMonth.bind(this) }>
        &#8250;
      </div>
    </div>
  );
}

const _renderInputs = () => {
  const {
    selectedTimeslots,
  } = this.state;

  const {
    startDate,
    endDate,
  } = this.inputProps;

  //Determines if multiple input or single one.
  const inputPrefix = selectedTimeslots.length > 1 ? '[]' : '';

  return selectedTimeslots.map((timeslot, index) => {
    return (
      <div key = { index } >
        <input
          name = { startDate.name + inputPrefix }
          className = { startDate.class }
          type = { startDate.type }
          value = { timeslot.startDate.format() }
        />
        <input
          name = { endDate.name + inputPrefix }
          className = { endDate.class }
          type = { endDate.type }
          value = { timeslot.endDate.format() }
        />
      </div>
    );
  });
}

const _onWeekOutOfMonth = (updateDate) => {
  this.setState({
    currentDate: updateDate,
  });

  return;
}

const _onGoToNextMonth = () => {
  const {
    currentDate,
  } = this.state;

  let nextDate = currentDate.clone()
    .startOf('month')
    .add(1, 'months')
    .startOf('month');

  this.setState({
    currentDate: nextDate,
  });
}

const _onGoToPrevMonth = () => {
  const {
    currentDate,
  } = this.state;

  let nextDate = currentDate.clone()
    .startOf('month')
    .subtract(1, 'months')
    .startOf('month');

  this.setState({
    currentDate: nextDate,
  });
}

const _formatDisabledTimeslots = props => {
  const { disabledTimeslots } = props;

  return disabledTimeslots.map((timeslot) => {
    let timeslotMoment = Object.assign({}, timeslot);
    timeslotMoment.startDate = moment(timeslotMoment.startDate, timeslotMoment.format);
    timeslotMoment.endDate = moment(timeslotMoment.endDate, timeslotMoment.format);

    return timeslotMoment;
  });
}

const _onTimeslotClick = (newTimeslot) => {
  const {
    selectedTimeslots,
  } = this.state;

  const {
    maxTimeslots,
    onSelectTimeslot,
  } = this.props;

  const newSelectedTimeslots = selectedTimeslots.slice();

  let existentTimeslotIndex = -1;
  const timeslotExists = newSelectedTimeslots.some((timeslot, index) => {
    existentTimeslotIndex = index;
    return newTimeslot.startDate.format() === timeslot.startDate.format();
  });

  if (timeslotExists) {
    newSelectedTimeslots.splice(existentTimeslotIndex, 1);
  }
  else {
    newSelectedTimeslots.push(newTimeslot);
  }

  if (newSelectedTimeslots.length > maxTimeslots) {
    newSelectedTimeslots.splice(0, 1);
  }

  this.setState({
    selectedTimeslots: newSelectedTimeslots,
    currentDate: moment(newTimeslot.startDate),
  }, () => {
    // State was set:
    onSelectTimeslot && onSelectTimeslot(newSelectedTimeslots, newTimeslot);
  });
}

const _updateInputProps = (startDateInputProps, endDateInputProps) => {
  const defaultStartDateProps = {
    name: 'tsc-startDate',
    classes: 'tsc-hidden-input',
    type: 'hidden',
  };

  const defaultEndDateProps = {
    name: 'tsc-endDate',
    classes: 'tsc-hidden-input',
    type: 'hidden',
  };

  this.inputProps = {
    startDate: Object.assign({}, defaultStartDateProps, startDateInputProps),
    endDate: Object.assign({}, defaultEndDateProps, endDateInputProps),
  };
}

const _updateTimeslotProps = (timeslotProps) => {
  const defaultProps = {
    format: 'h',
    showFormat: 'h:mm A',
  };

  timeslotProps = Object.assign({}, defaultProps, timeslotProps);
}

const _updateRenderDays = (renderDays) => {
  const defaultRenderDays = {
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
  };

  this.renderDays = Object.assign({}, defaultRenderDays, renderDays);
}
  
const Calendar = props => {
  moment.locale(locale);
  const {firstDay, initialDate, timeslots, timeslotProps, locale} = props

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
        onWeekOutOfMonth = { _onWeekOutOfMonth.bind(this) }
        onTimeslotClick = { _onTimeslotClick.bind(this) }
        timeslots = { timeslots }
        timeslotProps = { timeslotProps }
        selectedTimeslots = { selectedTimeslots }
        // disabledTimeslots = { _formatDisabledTimeslots() }
        // renderDays = { renderDays }
      />
    );
  }

  return (
    <div className = "tsc-calendar">
      {renderMonth()}
      {/* this._renderActions() }
      { this._renderMonth() }
      { this._renderInputs() */ }
      test
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
};

/**
 * @type {String} initialDate:  The initial date in which to place the calendar. Must be MomentJS parseable.
 * @type {Array} timeslots:  An array of timeslots to be displayed in each day.
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Array} disabledTimeslots: Initial value for selected timeslot inputs. Expects Dates formatted as Strings.
 * @type {Integer} maxTimexlots: maximum ammount of timeslots to select.
 * @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
 * @type {Object} startDateInputProps: properties for the startDate Inputs. Includes name, class, type (hidden, text...)
 * @type {Object} endDateInputProps: properties for the endDate Inputs. Includes name, class, type (hidden, text...)
 */
Calendar.propTypes = {
  initialDate: PropTypes.string.isRequired,
  timeslots: PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  maxTimeslots: PropTypes.number,
  renderDays: PropTypes.object,
  startDateInputProps: PropTypes.object,
  endDateInputProps: PropTypes.object,
  onSelectTimeslot: PropTypes.func,
};
