import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Context } from './Store'
import Timeslot from './Timeslot'
import util from './utility'

const Day = (props) => {
  const { dateObj } = props
  const [state] = useContext(Context)
  const { openBookings, timeslots, formats } = state
  const {
    dayTitleStartProps,
    dayTitleEndProps,
    slotTimeFieldFormat,
    classRoot,
  } = formats

  // console.log(openBookings)

  const dayBookings = util.getBookingsForDay(dateObj, openBookings)
  const classRootMod = `${classRoot}--day`

  const renderSlot = (slotTimeObj) => {
    if (!dayBookings) return null
    const time = slotTimeObj.format(slotTimeFieldFormat)
    return dayBookings[time] ? (
      <Timeslot timeslot={dayBookings[time]} />
    ) : (
      <small>{slotTimeObj.format('H.mm')}</small>
    )
  }

  const renderTimeTrack = () => {
    if (!timeslots || timeslots.length === 0) return null
    return (
      <div className={`${classRoot}--day-blocks`}>
        {timeslots.map((slot) => {
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
      {renderTimeTrack(dayBookings)}
    </div>
  )
}

export default Day
