import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import util from './utility.js'

const Timeslot = (props) => {
  const {
    slot,
    slotTimeFormat,
    selectedSlots,
    setSelectedSlots,
    handleSlotClick,
    classRoot,
  } = props

  const start = util.getDate(slot.start)

  const startTime = start.format(slotTimeFormat)
  const date = start.format(process.env.REACT_APP_TIMEFIELD_FORMAT)
  const init = util.isSlotSelected(date, selectedSlots)
  const [selected, setSelected] = useState(init)

  const buttonClasses = classNames({
    btn: true,
    [`btn--${classRoot}-slot`]: true,
    'btn--selected': selected,
  })

  const onClick = (e) => {
    const date = e.target.name
    const updated = !selected
    setSelected(updated)
    util.updateSlots(updated, date, selectedSlots, setSelectedSlots)
  }

  const classRootMod = `${classRoot}--slot`

  return (
    <div className={classRootMod} key={date}>
      <button
        type="submit"
        className={buttonClasses}
        name={date}
        onClick={onClick}
        // onClick={() => {
        //   const updated = !selected
        //   setSelected(updated)
        //   handleSlotClick(date, updated)
        // }}
      >
        {startTime}
      </button>
    </div>
  )
}

export default Timeslot
