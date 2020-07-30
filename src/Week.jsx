import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Day from './Day'
import util from './utility'

const Week = (props) => {
  const {
    daysSequence,
    dayTitleStartProps,
    dayTitleEndProps,
    slots,
    bookings,
    slotTimeFormat,
    selectedSlots,
    setSelectedSlots,
    slotTimeFieldFormat,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--week`

  return (
    <div className={classRootMod}>
      {daysSequence.map((day) => {
        const dayBookings = util.getBookingsForDay(day, bookings)

        return (
          <Day
            key={day.format('X')}
            dateObj={day}
            slots={slots}
            dayTitleStartProps={dayTitleStartProps}
            dayTitleEndProps={dayTitleEndProps}
            dayBookings={dayBookings}
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
            slotTimeFormat={slotTimeFormat}
            slotTimeFieldFormat={slotTimeFieldFormat}
            classRoot={classRoot}
          />
        )
      })}
    </div>
  )
}

export default Week
