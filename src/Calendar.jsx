import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from './Store'
import Header from './Header'
import Controls from './Controls'
import Week from './Week'
import Details from './Details'
import Submit from './Submit'
import util from './utility'

const Calendar = () => {
  const [state, dispatch] = useContext(Context)
  const { query, formats, error, apiData } = state
  const { classRoot } = formats
  const clientData = util.getClientData()
  const { apiUrl } = query
  const newApiData = util.getApiData(apiUrl, apiData)
  const { status, bookings, slots } = newApiData

  useEffect(() => {
    if (clientData) {
      dispatch({ type: 'SET_CLIENT', payload: clientData })
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
    if (bookings, slots, apiUrl) {
      dispatch({ type: 'UPDATE_API_DATA', payload: {bookings, slots, apiUrl} })
    }
  }, [apiUrl, bookings, slots, query, status, error])

  console.log(apiData)

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
      <Submit />
    </div>
  )
}

export default Calendar
