import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from './Store'
import Header from './Header'
import Controls from './Controls'
import Week from './Week'
import Details from './Details'
import util from './utility'

const Calendar = () => {
  const [state, dispatch] = useContext(Context)
  const { query, formats, error } = state
  const { classRoot } = formats
  const { apiUrl } = query
  const apiData = util.getApiData(apiUrl)
  const { status, bookings, slots } = apiData
  // console.log(status, bookings, slots)

  useEffect(() => {
    if (apiData) {
      // setApiData(util.getApiData(apiUrl, null, dispatch))
    }
    if (bookings) {
      dispatch({ type: 'SET_BOOKINGS', payload: bookings })
    }
    if (slots) {
      dispatch({ type: 'SET_TIMESLOTS', payload: slots })
    }
    if (status) {
      dispatch({ type: 'SET_STATUS', payload: status })
    }
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error })
    }
  }, [apiUrl, bookings, slots, status, error])

  return (
    <div className={classRoot}>
      <Header />
      <Controls />
      <Details />

      <div className={`${classRoot}--content-wrapper`}>
        {status === 'LOADING' && (
          <div className={`${classRoot}--loading loading`}>
            <h3>Loading...</h3>
          </div>
        )}
        {status === 'ERROR' && (
          <div className={`${classRoot}--error error`}>
            <h3>There was an error.</h3>
          </div>
        )}
        {status === 'SUCCESS' && <Week />}
      </div>
    </div>
  )
}

export default Calendar
