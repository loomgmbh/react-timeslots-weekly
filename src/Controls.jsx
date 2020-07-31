import React, { useState, useContext } from 'react';
import Store, { Context } from './Store'
import PropTypes from 'prop-types';
import util from './utility.js'

const Controls = props => {
  const [state, dispatch] = useContext(Context)
  const {query, formats} = state
  const {
    currentWeekNumber,
    weekNumber,
    startDay,
    daySteps,
  } = query
  const {classRoot} = formats

  const handleClick = (e) => {
    const value = e.target.value ?? 0
    const steps = parseInt(value) * parseInt(daySteps)
    const newDay = startDay.clone().add(steps, 'days')
    const newEndDay = newDay.clone().add(steps - 1, 'days')
    const newWeekNumber = parseInt(weekNumber) + parseInt(value)
    const changes = {
      startDay: newDay,
      endDay: newEndDay,
      weekNumber: newWeekNumber,
      daysOfWeek: util.getDaysOfWeek(newDay, daySteps),
    }    
    const payload = {...query, ...changes}
    console.log('payload', payload)
    dispatch({ type: 'SET_QUERY', payload: payload })
  }

  const classRootMod = `${classRoot}--controls`
  return (
    <div className={classRootMod}>
      <button 
        className={`btn btn--${classRootMod}`}
        name='previous'
        value='-1'
        disabled={weekNumber === currentWeekNumber}
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
