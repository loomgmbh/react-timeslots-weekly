import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Timeslots from './TimeSlots'
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
    handleSlotClick,
    slotsDuration,
    dayStartTime,
    dayEndTime,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--day`

  const hasOpenBooking = (slotTimeObj) => {
    const format = 'YYYY-MM-DDTHH:mm:ss'
    const time = slotTimeObj.format(format)
    // const format = process.env.REACT_APP_TIMEFIELD_FORMAT
    return (
      daySlots[time] && (
        <Timeslot
          slot={daySlots[time]}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          slotTimeFormat={slotTimeFormat}
          classRoot={classRoot}
        />
      )
    )
  }

  const renderSlots = (daySlots) => {
    if (!daySlots || daySlots.length === 0) return null
    const renderTrack = () => {
      return (
        <div className={`${classRoot}--day-slots`}>
          {slots.map((slot) => {
            const slotTimeObj = dateObj
              .clone()
              .startOf('day')
              .add('minutes', slot)
            return (
              <div key={slot} className={`${classRoot}--time-block`}>
                <small>{slotTimeObj.format('H.mm')}</small>
                {hasOpenBooking(slotTimeObj)}
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <>
        {renderTrack()}
        {/* 
        <Timeslots
          daySlots={daySlots || []}
          slotTimeFormat={slotTimeFormat}
          selectedSlots={selectedSlots}
          setSelectedSlots={setSelectedSlots}
          handleSlotClick={handleSlotClick}
          classRoot={classRoot}
        />
        */}
      </>
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
  )
}

export default Day
