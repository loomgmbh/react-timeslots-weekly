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
  // console.log(dayBookings)
  // const renderSlot = (slotTimeObj) => {
  //   if (!dayBookings) return null
  //   const time = slotTimeObj.format(slotTimeFieldFormat)
  //   // return dayBookings[time] ? (
  //   return true ? (
  //     // eslint-disable-next-line react/jsx-props-no-spreading
  //     <Timeslot {...dayBookings[time]} />
  //   ) : (
  //     <small>{slotTimeObj.format('H.mm')}</small>
  //   )
  // }

  return (
    <div className={classRootMod}>
      <div className={`${classRootMod}-title`}>
        <h5>
          <span>{dateObj.format(dayTitleStartProps)} </span>
          <span>{dateObj.format(dayTitleEndProps)} </span>
        </h5>
      </div>
      {/* renderTimeTrack(dayBookings) */}
      <div className={`${classRoot}--slots`}>
        {Object.entries(dayBookings).map(([time, slotValues]) => {
          // console.log(time, slotValues)
          return <Timeslot key={time} {...slotValues} />
        })}
      </div>
    </div>
  )
}

export default Day
