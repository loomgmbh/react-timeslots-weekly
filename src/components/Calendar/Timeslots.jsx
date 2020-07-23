import React, { useState } from 'react'
import Timeslot from './Timeslot.jsx'
import PropTypes from 'prop-types'

const Timeslots = props => {
  const {
    daySlots,
    slotTimeFormat,
    selectedSlots,
    setSelectedSlots,
    handleSlotClick,
    classRoot,
  } = props

  const classRootMod = `${classRoot}--timeslots`
  const id = `${classRoot}--timeslot`

  return (
    <div className={classRootMod}>
      {daySlots.map((slot, index) => {     
        return (
          <Timeslot
            key={`${id}-${index}`}
            slot={slot}
            slotTimeFormat={slotTimeFormat}
            selectedSlots={selectedSlots}
            setSelectedSlots={setSelectedSlots}
            handleSlotClick={handleSlotClick}
            classRoot={classRoot}
          />
        )
      })}
    </div>
  )
}

export default Timeslots
