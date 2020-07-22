import React, { useState } from 'react';
import PropTypes from 'prop-types';
import util from './utility.js'

const Timeslots = props => {
  const {
    daySlots,
    setSlots,
    slotTimeFormat,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--dayslots`

  return (
    <div className={classRootMod}>
      {daySlots.map(slot => {
        // console.log(slot)
        if (typeof slot['start'] !== 'undefined') {
          const start = util.getDate(slot['start']);
          const classRootModInner = `${classRoot}--button`
          const buttonClasses = `btn btn--${classRoot}-slot`
          const startTime = start.format(slotTimeFormat)
          return (
            <div className={classRootModInner} key={slot['start']}>
            <button className={buttonClasses}>
              {startTime}
            </button>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Timeslots
