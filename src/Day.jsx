import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Timeslot from './TimeSlot'
import util from './utility'

const Day = (props) => {
  const {
    dateObj,
    slots,
    dayTitleStartProps,
    dayTitleEndProps,
    daySlots,
    selectedSlots,
    setSelectedSlots,
    slotTimeFormat,
    slotTimeFieldFormat,
    handleSlotClick,
    slotsDuration,
    dayStartTime,
    dayEndTime,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--day`

  const renderSlot = (slotTimeObj) => {
    if (!daySlots) return null
    const time = slotTimeObj.format(slotTimeFieldFormat)
    // const format = process.env.REACT_APP_TIMEFIELD_FORMAT
    // if (daySlots)
    return daySlots[time] ? (
      <Timeslot
        slot={daySlots[time]}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        slotTimeFormat={slotTimeFormat}
        classRoot={classRoot}
      />
    ) : (
      <small>{slotTimeObj.format('H.mm')}</small>
    )
  }

  const renderTimeTrack = (daySlots) => {
    if (!slots || slots.length === 0) return null
    return (
      <div className={`${classRoot}--day-blocks`}>
        {slots.map((slot) => {
          const slotTimeObj = dateObj
            .clone()
            .startOf('day')
            .add(slot, 'minutes')
          return (
            <div key={slot} className={`${classRoot}--time-block`}>
              {renderSlot(slotTimeObj)}
            </div>
          )
        })}
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
      {renderTimeTrack(daySlots)}
    </div>
  )
}

export default Day
