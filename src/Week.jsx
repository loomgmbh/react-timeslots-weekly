import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from './Store'
import Day from './Day'

const Week = (props) => {
  const [state] = useContext(Context)
  const { query, formats } = state
  const { daysOfWeek } = query
  const { classRoot } = formats
  const classRootMod = `${classRoot}--week`

  return (
    <div className={classRootMod}>
      {daysOfWeek.map((day) => {
        return <Day key={day.format('X')} dateObj={day} />
      })}
    </div>
  )
}

export default Week
