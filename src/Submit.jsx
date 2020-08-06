import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Context } from './Store'
import util from './utility'

const Submit = (props) => {
  const [state, dispatch] = useContext(Context)
  const { selectedBookings, query, formats, status } = state
  const {
    apiPostUrl,
    currentWeekNumber,
    weekNumber,
    startDay,
    endDay,
    daySteps,
  } = query
  const { classRoot, slotTimeFieldFormat } = formats

  const handleClick = () => {
    util.postApiData(apiPostUrl, { selected: selectedBookings })
  }

  const classRootMod = `${classRoot}--submit`
  return (
    <div className={classRootMod}>
      <button
        type="submit"
        className={`btn btn--${classRootMod}`}
        name="submit"
        disabled={
          util.isDisabled(status) || !util.hasSelection(selectedBookings)
        }
        onClick={handleClick}
      >
        Termin buchen
      </button>
    </div>
  )
}

export default Submit
