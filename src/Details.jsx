import React, { useContext } from 'react'
import { Context } from './Store'
import util from './utility'

const Details = () => {
  const [state] = useContext(Context)
  const { selectedBookings, query, formats } = state
  const { startDay, endDay, apiUrl } = query
  const { classRoot, footerSelectedTimeFormat } = formats

  const classRootMod = `${classRoot}--footer`
  const selectedCount = Object.keys(selectedBookings).length
  const renderSelectedBookings = () => {
    return (
      selectedCount > 0 && (
        <div>
          <h5>{Object.keys(selectedBookings).length} selected</h5>
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
  console.log()
  return (
    <div className={classRootMod}>
      {process.env.NODE_ENV === 'development' && (
        <>
          <h3>Start {startDay.format('DD.MM.')}</h3>
          <h3>End {endDay.format('DD.MM.')}</h3>
          <h5>Url: {apiUrl}</h5>
        </>
      )}
      {renderSelectedBookings()}
    </div>
  )
}

export default Details