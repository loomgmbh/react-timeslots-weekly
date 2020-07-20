import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  DEFAULT,
  SELECTED,
  DISABLED,
} from '../constants/timeslot.js';

const Timeslot = props => {

  const {
    description,
    status,
    customClassNames,
    classRoot,
    locale
  } = props;

  const classRootModified = `${classRoot}--timeslot`
  const timeslotClassNames = classnames({
    'booking-calendar--timeslot': true,
    'booking-calendar--timeslot__disabled': status == SELECTED,
    'booking-calendar--timeslot__selected': status == DISABLED,
  }, customClassNames);

  const _onTimeslotClick = (event) => {
    event.preventDefault();
    const {
      status,
      onClick,
    } = this.props;

    if (status !== DISABLED) {
      onClick();
    }
  }

  return (
    <div className = { timeslotClassNames } onClick = { _onTimeslotClick.bind(this) }>
      { description }
    </div>
  );

}

export default Timeslot

Timeslot.defaultProps = {
  status: DEFAULT,
};

/**
 * @type {String} description: The contents to be displayed by the timeslot. Default format will resume to something similar to "7:00 PM - 8:00 PM"
 * @type {String} status: allows the div to change format based on the current status of the element (disabled, selected, default)
 * @type (Function) onClick: Function to be excecuted when clicked.
 * @type {String} classRoot: A string to use as css-class root.
 * @type {String} locale: country language code.
 */
Timeslot.propTypes = {
  description: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    DEFAULT,
    SELECTED,
    DISABLED,
  ]),
  onClick: PropTypes.func.isRequired,
  customClassNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  classRoot: PropTypes.string.isRequired,
  locale: PropTypes.string
};
