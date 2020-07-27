import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Day from './Day.jsx'
import util from './utility.js'

const Week = (props) => {
  const {
    days,
    dayTitleStartProps,
    dayTitleEndProps,
    slotsData,
    slotTimeFormat,
    selectedSlots,
    setSelectedSlots,
    handleSlotClick,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--week`
  const slots = util.getSlotsDataValue(slotsData, 'slots')
  const bookings = util.getSlotsDataValue(slotsData, 'bookings')

  return (
    <div className={classRootMod}>
      {days.map((day) => {
        const daySlots = util.getBookingsForDay(day, bookings)
        return (
          <Day
            key={day.format('X')}
            dateObj={day}
            slots={slots}
            dayTitleStartProps={dayTitleStartProps}
            dayTitleEndProps={dayTitleEndProps}
            daySlots={daySlots}
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
            slotTimeFormat={slotTimeFormat}
            handleSlotClick={handleSlotClick}
            classRoot={classRoot}
          />
        )
      })}
    </div>
  )
}

export default Week
