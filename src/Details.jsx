import React, { useContext } from 'react'
import { Context } from './Store'
import util from './utility'

const Details = () => {
  const [state] = useContext(Context)
  const { selectedBookings, query, formats } = state
  const { startDay, endDay, apiUrl } = query
  const { classRoot, footerSelectedTimeFormat } = formats
  const classRootMod = `${classRoot}--footer`

  const renderSelectedBookings = () => {
    return (
      util.hasSelection(selectedBookings) && (
        <div>
          {Object.entries(selectedBookings).map(([key, value]) => {
            const date = util.getDate(key)
            return (
              <div key={date.format('x')}>
                {date.format(footerSelectedTimeFormat)}
              </div>
            )
          })}
        </div>
      )
    )
  }

  return (
    <div className={classRootMod}>
      {util.isDevelopment() && (
        <>
          <h3>Start {startDay.format('DD.MM.')}</h3>
          <h3>End {endDay.format('DD.MM.')}</h3>
          <h5>{Object.keys(selectedBookings).length} selected</h5>
          <h5>get:</h5>
          <h4>{apiUrl}</h4>
        </>
      )}
      {renderSelectedBookings()}
    </div>
  )
}

export default Details
