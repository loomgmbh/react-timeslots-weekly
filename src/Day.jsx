import React, { useContext } from 'react'
import { Context } from './Store'
import Timeslot from './Timeslot'
import util from './utility'

const Day = ({ dateObj }) => {
  const [state] = useContext(Context)
  const { openBookings, timeslots, formats } = state
  const {
    dayTitleStartProps,
    dayTitleEndProps,
    slotTimeFieldFormat,
    classRoot,
  } = formats

  const dayBookings = util.getBookingsForDay(dateObj, openBookings)
  const classRootMod = `${classRoot}--day`

  return (
    <div className={classRootMod}>
      <div className={`${classRootMod}-title`}>
        <h5>
          <span>{dateObj.format(dayTitleStartProps)} </span>
          <span>{dateObj.format(dayTitleEndProps)} </span>
        </h5>
      </div>
      <div className={`${classRoot}--slots`}>
        {Object.entries(dayBookings).map(([time, slotValues]) => {
          return <Timeslot key={time} {...slotValues} />
        })}
      </div>
    </div>
  )
}

export default Day
