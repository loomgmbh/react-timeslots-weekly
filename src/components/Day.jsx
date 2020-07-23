import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import Timeslot from './timeslot.jsx';

import {
  DEFAULT_TIMESLOT_FORMAT,
  DEFAULT_TIMESLOT_SHOW_FORMAT,
} from '../constants/day.js';

import {
  DEFAULT,
  DISABLED,
  SELECTED,
} from '../constants/timeslot.js';


const Day = props => {
  const {
    timeslots,
    timeslotProps,
    selectedTimeslots,
    disabledTimeslots,
    timeslotFormat,
    timeslotShowFormat,
    onTimeslotClick,
    renderTitle,
    momentTime,
    initialDate,
    classRoot,
    locale
  } = props
  const classRootModified = `${classRoot}--day`

  const _renderTitle = () => {
    return (
      <div className = {`${classRoot}--day-title`}>
        <span>{renderTitle(momentTime)}</span>
      </div>
    );
  }
  
  const _renderTimeSlots = () => {
    
    return timeslots.map((slot, index) => {
      let description = '';
      for (let i = 0; i < slot.length; i ++){
        description += moment(slot[i], timeslotProps.format).format(timeslotProps.showFormat);
        if (i < (slot.length - 1)){
          description += ' - ';
        }
      }
      let timeslotDates = {
        startDate: momentTime.clone().add(slot[0], timeslotProps.format),
        endDate: momentTime.clone().add(slot[slot.length - 1], timeslotProps.format),
      };
  
      let status = DEFAULT;
      if (timeslotDates.startDate.isBefore(initialDate) || timeslotDates.startDate.isSame(initialDate)) {
        status = DISABLED;
      }
  
      const isSelected = selectedTimeslots.some((selectedTimeslot) => {
        return timeslotDates.startDate.format() === selectedTimeslot.startDate.format();
      });
  
      const isDisabled = disabledTimeslots.some((disabledTimeslot) => {
        return disabledTimeslot.startDate.isBetween(timeslotDates.startDate, timeslotDates.endDate, null, '[)') ||
               disabledTimeslot.endDate.isBetween(timeslotDates.startDate, timeslotDates.endDate, null, '(]');
      });
  
      if (isDisabled) {
        status = DISABLED;
      }
      else if (isSelected) {
        status = SELECTED;
      }
  
  
      return (
        <Timeslot
          key = { index }
          description = { description }
          onClick = { _onTimeslotClick.bind(this, index) }
          status = { status }
          classRoot = { classRoot }
          locale = { locale }
        />
      );
    });
  }
  
  const _onTimeslotClick = props => {
    const {
      index,
      timeslots,
      timeslotFormat,
      momentTime,
      onTimeslotClick,
    } = props;
  
    const timeslot = {
      startDate: momentTime.clone().add(timeslots[index][0], timeslotFormat),
      endDate: momentTime.clone().add(timeslots[index][1], timeslotFormat),
    };
  
    onTimeslotClick(timeslot);
  }

  /*@todo: how to use classname effectively */
  const dayClassNames = classnames({
    'class-root': true,
  });

  return (
    <div className = { classRootModified }>
      { _renderTitle() }
      { _renderTimeSlots() }
    </div>
  );

}

export default Day

Day.defaultProps = {
  timeslotFormat: DEFAULT_TIMESLOT_FORMAT,
  timeslotShowFormat: DEFAULT_TIMESLOT_SHOW_FORMAT,
  renderTitle: (momentTime) => {
    return momentTime.format('dddd (D)');
  },
};

/**
 * @type {Array} timeslots: Array of timeslots.
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Selected Timeslots Set used to add the SELECTED status if needed when renderizing timeslots.
 * @type {Array} disabledTimeslots: Disabled Timeslots Set used to add the DISABLED status if needed when renderizing timeslots.
 * @type {String} timeslotFormat: format used by moment when identifying the timeslot
 * @type {String} timslotShowFormat: format to show used by moment when formating timeslot hours for final view.
 * @type {Function} onTimeslotClick: Function to be excecuted when clicked.
 * @type {Function} renderTitle: Function to be used when rendering the title.
 * @type {Object} momentTime: MomentJS datetime object.
 * @type {Object} initialDate: Moment JS Date used to initialize the Calendar and which progresses further into the tree.
 * @type {String} classRoot: A string to use as css-class root.
 * @type {String} locale: country language code.
 */
Day.propTypes = {
  timeslots: PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  timeslotFormat: PropTypes.string.isRequired,
  timeslotShowFormat: PropTypes.string.isRequired,
  onTimeslotClick: PropTypes.func.isRequired,
  renderTitle: PropTypes.func.isRequired,
  momentTime: PropTypes.object.isRequired,
  initialDate: PropTypes.object.isRequired,
  classRoot: PropTypes.string.isRequired,
  locale: PropTypes.string
};