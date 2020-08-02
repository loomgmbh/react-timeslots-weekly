import React, { useState, useContext } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Context } from './Store'
import util from './utility'

const Timeslot = (props) => {
  const { timeslot } = props
  const [state, dispatch] = useContext(Context)
  const { selectedBookings, formats } = state
  const { slotTimeFormat, slotTimeFieldFormat, classRoot } = formats
  const start = moment(timeslot.start)
  const startTime = start.format(slotTimeFormat)
  const date = start.format(slotTimeFieldFormat)
  const init = util.isSlotSelected(date, selectedBookings)
  const [selected, setSelected] = useState(init)

  const buttonClasses = classNames({
    btn: true,
    [`btn--${classRoot}-slot`]: true,
    'btn--selected': selected,
  })

  const onClick = (e) => {
    const selectedDate = e.target.name
    const updated = !selected
    setSelected(updated)
    util.updateBookings(updated, selectedDate, dispatch)
  }

  const isDisabled = () => start.isBefore(moment())

  const classRootMod = `${classRoot}--slot`

  return (
    <div className={classRootMod} key={date}>
      <button
        type="submit"
        className={buttonClasses}
        name={date}
        onClick={onClick}
        disabled={isDisabled()}
      >
        {startTime}
      </button>
    </div>
  )
}

export default Timeslot
