import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Timeslot from './Timeslot.jsx'

const Timeslots = (props) => {
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
    daySlots && (
      <div className={classRootMod}>
        {/* daySlots.map((slot, index) => {
          const key = `${id}-${index}`
          return (
            <Timeslot
              key={key}
              slot={slot}
              slotTimeFormat={slotTimeFormat}
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              handleSlotClick={handleSlotClick}
              classRoot={classRoot}
            />
          )
        }) */}
      </div>
    )
  )
}

export default Timeslots
