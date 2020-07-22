import React, { useState } from 'react';
import Day from './Day.jsx'
import util from './utility.js'
import PropTypes from 'prop-types';

const Week = props => {
  const {
    days, 
    dayTitleStartProps,
    dayTitleEndProps,
    slots,
    setSlots,
    slotTimeFormat,
    classRoot
  } = props

  const classRootMod = `${classRoot}--week`
  
  return (
    <div className = {classRootMod}>
      {days.map(day => {
        const daySlots = util.getSlotsForDay(day, slots)
        return (
          <Day
            key={day.format('X')} 
            dateObj = {day}
            dayTitleStartProps = {dayTitleStartProps}
            dayTitleEndProps = {dayTitleEndProps}
            daySlots={daySlots}
            setSlots={setSlots}
            slotTimeFormat={slotTimeFormat}
            classRoot = {classRoot}
          />
        )
      })}
    </div>
  );
}

export default Week
