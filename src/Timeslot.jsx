import React, { useState, useContext } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Context } from './Store'
import util from './utility'

const Timeslot = (props) => {
  console.log(props)
  const [state, dispatch] = useContext(Context)
  const { selectedBookings, formats } = state
  const { slotTimeFormat, slotTimeFieldFormat, classRoot } = formats
  // const { timeslot } = props
  const { tid, start, end } = props
  const startObj = moment(start)
  const endObj = moment(end)
  const displayTime = startObj.format(slotTimeFormat)
  const startDate = startObj.format(slotTimeFieldFormat)
  const endDate = endObj.format(slotTimeFieldFormat)
  const init = util.isSlotSelected(startDate, selectedBookings)
  const [selected, setSelected] = useState(init)

  const buttonClasses = classNames({
    btn: true,
    [`btn--${classRoot}-slot`]: true,
    'btn--selected': selected,
  })

  const handleClick = (slotStart, slotEnd, tid) => {
    const updated = !selected
    setSelected(updated)
    util.updateBookings(tid, updated, slotStart, slotEnd, dispatch)
  }

  const isDisabled = () => endObj.isBefore(moment())

  const classRootMod = `${classRoot}--slot`

  return (
    <div className={classRootMod} key={startDate}>
      <button
        type="submit"
        className={buttonClasses}
        name={startDate}
        end={endDate}
        onClick={() => handleClick(startDate, endDate, tid)}
        disabled={isDisabled()}
      >
        {displayTime}
      </button>
    </div>
  )
}

export default Timeslot
