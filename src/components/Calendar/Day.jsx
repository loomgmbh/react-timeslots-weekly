import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Timeslots from './TimeSlots.jsx'
import util from './utility.js'

const Day = props => {
  const {
    dateObj, 
    dayTitleStartProps,
    dayTitleEndProps,
    daySlots,
    selectedSlots,
    setSelectedSlots,
    slotTimeFormat,
    handleSlotClick,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--day`

  const renderSlots = (daySlots) => {
    if (!daySlots || daySlots.length == 0) return
    return (
      <Timeslots 
        daySlots={daySlots}
        slotTimeFormat={slotTimeFormat}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        handleSlotClick={handleSlotClick}
        classRoot={classRoot}
      />
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
