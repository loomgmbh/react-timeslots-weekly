import React from 'react';
import PropTypes from 'prop-types';
import helpers from './../util/helpers';
import Day from './Day.jsx';

import {
  RENDER_DAYS
} from '../constants/week.js';

const _onTimeslotClick = (timeslot) => {
  const {
    onTimeslotClick,
  } = this.props;

  onTimeslotClick(timeslot);
}

const Week = props => {
  const {
    weekToRender,
    onTimeslotClick,
    initialDate,
    timeslots,
    timeslotProps,
    selectedTimeslots,
    disabledTimeslots,
    renderDays,
    classRoot,
    locale
  } = props
  const classRootModified = `${classRoot}--week`
  const _renderWeekDays = () => {
    return weekToRender.map((day, index) => {
      // console.log(day)
      let formattedDate = helpers.getMomentFromCalendarJSDateElement(day, locale);
      const weekDay = formattedDate.locale('en').format('dddd').toLowerCase();
      const renderTitle = () => {
        return (
          <>
            <div>{formattedDate.locale(locale).format('dddd').substr(0, 2)}</div>
            <div>{formattedDate.format('D.')}</div>
          </>
        )
      }
      if (renderDays[weekDay]){
        return (
          <Day
            key = { index }
            onTimeslotClick = { _onTimeslotClick.bind(this) }
            initialDate = { initialDate }
            timeslots = { timeslots }
            timeslotProps = { timeslotProps }
            renderTitle = { renderTitle }
            selectedTimeslots = { selectedTimeslots }
            disabledTimeslots = { disabledTimeslots }
            momentTime = { formattedDate }
            classRoot = { classRoot }
            locale = { locale }
          />
        );
      }
    });
  }

  return (
    <div className = {classRootModified}>
      { _renderWeekDays() }
    </div>
  );
}
export default Week


Week.defaultProps = {
  renderDays: RENDER_DAYS
};

/**
 * @type {Array} weekToRender: Week to render. Each day should also have the requested timeslots, unless default configuration is desired.
 * @type {Function} onTimeslotClick: Function to be excecuted when clicked.
 * @type {Object} initialDate: Moment JS Date used to initialize the Calendar and which progresses further into the tree.
 * @type {Array} timeslots: Timeslots Set of Timeslot elements to render. Progresses further into the tree.
 * @type {Object} timeslotProps: An object with keys and values for timeslot props (format, viewFormat)
 * @type {Array} selectedTimeslots: Selected Timeslots Set used further into the tree to add the classes needed to when renderizing timeslots.
 * @type {Array} disabledTimeslots: Disabled Timeslots Set used further into the tree to add the classes needed to when renderizing timeslots.
 * @type {Object} renderDays: An array of days which states which days of the week to render. By default renders all days.
 * @type {String} classRoot: A string to use as css-class root.
 * @type {String} locale: country language code.
 */
Week.propTypes = {
  weekToRender: PropTypes.array.isRequired,
  onTimeslotClick: PropTypes.func.isRequired,
  initialDate: PropTypes.object.isRequired,
  timeslots : PropTypes.array.isRequired,
  timeslotProps: PropTypes.object,
  selectedTimeslots: PropTypes.array,
  disabledTimeslots: PropTypes.array,
  renderDays: PropTypes.object,
  classRoot: PropTypes.string.isRequired,
  locale: PropTypes.string
};
