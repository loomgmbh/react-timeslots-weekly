import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Timeslots from './TimeSlots.jsx'
import util from './utility.js'

const Day = props => {
  const {
    dateObj, 
    classRoot,
    dayTitleStartProps,
    dayTitleEndProps,
    daySlots,
    setSlots,
    slotTimeFormat
  } = props

  const classRootMod = `${classRoot}--day`

  const renderSlots = (daySlots) => {
    if (!daySlots || daySlots.length == 0) return
    return (
      <div className={`${classRootMod}-timeslots`}>
        <Timeslots 
          daySlots={daySlots}
          slotTimeFormat={slotTimeFormat}
        />
      </div>
    )
  }

  return (
    <div className={classRootMod}>
      <div className={`${classRootMod}-title`}>
        <h5>
          <span>{dateObj.format(dayTitleStartProps)} </span>
          <span>{dateObj.format(dayTitleEndProps)} </span>
        </h5>
      </div>
      {renderSlots(daySlots)}
    </div>
  );
}

export default Day
