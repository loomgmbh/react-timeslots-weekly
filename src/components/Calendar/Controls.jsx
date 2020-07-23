import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import util from './utility.js'


const Controls = props => {
  const {
    weekNumber,
    weekNumberRef,
    setWeekNumber,
    startDay,
    setStartDay,
    setEndDay,
    daySteps,
    setDays,
    classRoot
  } = props

  const handleClick = (e) => {
    const value = e.target.value ?? 0
    const steps = parseInt(value) * parseInt(daySteps)
    const newDay = startDay.clone().add(steps, 'days')
    const newEndDay = newDay.clone().add(steps - 1, 'days')
    const newWeekNumber = parseInt(weekNumber) + parseInt(value)
    setStartDay(newDay)
    setEndDay(newEndDay)
    setWeekNumber(newWeekNumber)
    setDays(util.getDays(newDay, daySteps))
  }

  const classRootMod = `${classRoot}--controls`
  return (
    <div className={classRootMod}>
      <button 
        className={`btn btn--${classRootMod}`}
        name='previous'
        value='-1'
        disabled={weekNumber === weekNumberRef}
        onClick={handleClick}
      >
        &#8249;
      </button>
      <button 
        className={`btn btn--${classRoot}-controls`}
        name='next'
        value='1'
        onClick={handleClick}
      >
        &#8250;
      </button>
    </div>
  );
}

export default Controls
