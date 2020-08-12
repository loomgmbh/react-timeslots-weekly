import React, { useState, useContext } from 'react';
import Store, { Context } from './Store'
import PropTypes from 'prop-types';
import util from './utility.js'

const Controls = props => {
  const [state, dispatch] = useContext(Context)
  const {query, formats, status} = state
  const {
    productId,
    currentWeekNumber,
    weekNumber,
    startDay,
    endDay,
    daySteps,
  } = query
  const {classRoot, slotTimeFieldFormat} = formats

  const handleClick = (e) => {
    const value = e.target.value ?? 0
    const steps = parseInt(value) * parseInt(daySteps)
    console.log(steps)
    const newDay = startDay.clone().add(steps, 'days')
    const newEndDay = newDay.clone().add(1, 'week').subtract(1, 'second')
    const newWeekNumber = parseInt(weekNumber) + parseInt(value)
    const newUrl = util.getSlotsUrl(
      productId,
      newDay,
      newEndDay,
      slotTimeFieldFormat
    )
    const changes = {
      apiUrl: newUrl,
      startDay: newDay,
      endDay: newEndDay,
      weekNumber: newWeekNumber,
      daysOfWeek: util.getDaysOfWeek(newDay, daySteps),
    }    
    const payload = {...query, ...changes}
    dispatch({ type: 'SET_QUERY', payload: payload })
  }

  const classRootMod = `${classRoot}--controls`
  return (    
    <div className={classRootMod}>
      <button 
        type="button"
        className={`btn btn--${classRootMod}`}
        name='previous'
        value='-1'
        disabled={util.isDisabled(status) || (weekNumber === currentWeekNumber)}
        onClick={handleClick}
      >
        &#8249;
      </button>
      <button
        type="button"
        className={`btn btn--${classRoot}-controls`}
        name='next'
        value='1'
        onClick={handleClick}
        disabled={util.isDisabled(status)}
      >
        &#8250;
      </button>
    </div>
  );
}

export default Controls
