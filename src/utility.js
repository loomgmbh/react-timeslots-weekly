import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import moment from 'moment'
// import useFetch from 'use-http'
import useFetch from 'react-hook-usefetch'

const util = {}
export default util

util.getProductId = () => {
  return 'dev' ? 201 : drupalSettings.bookingCalendar.productId
}

util.getDate = (initialDate, locale = process.env.REACT_APP_LOCALE) => {
  if (initialDate) {
    return moment(initialDate).locale(locale)
  }

  return moment().locale(locale)
}

util.getWeekNumber = (dateObj) => {
  return dateObj.isoWeek()
}

util.getStartDay = (dateObj) => {
  return dateObj.clone().startOf('isoWeek')
}

util.getEndDay = (dateObj) => {
  return dateObj.clone().endOf('isoWeek')
}

util.getDaySequence = (dateObj, daySteps) => {
  const days = []
  for (let i = 0; i < daySteps; i++) {
    days.push(moment(dateObj).add(i, 'days'))
  }
  return days
}

util.getBookingsForDay = (day, slots) => {
  const index = day.format('Y-MM-DD')
  if (!slots) return []
  return typeof slots[index] !== 'undefined' ? slots[index] : []
}

util.updateBookings = (selected, value, dispatch) => {
  if (selected) {
    const slot = {
      start: value,
      end: '@todo',
      duration: '@todo',
    }
    dispatch({ type: 'ADD_BOOKING', payload: slot })
  } else {
    dispatch({ type: 'REMOVE_BOOKING', payload: value })
  }
}

util.getSlotsUrl = (id, startDateObj, endDateObj, slotTimeFieldFormat) => {
  return (
    `${
      process.env.REACT_APP_BASE_URL +
      process.env.REACT_APP_API_BOOKINGS_ENDPOINT +
      id
    }?df=${startDateObj.format(slotTimeFieldFormat)}` +
    `&dt=${endDateObj.format(slotTimeFieldFormat)}`
  )
}

util.getApiData = (
  id,
  startDateObj,
  endDateObj,
  globalLoading,
  setGlobalLoading,
  globalError,
  setGlobalError,
  slotTimeFieldFormat
) => {
  // const [bookings] = useLocalStorage('bookings')
  // console.log(localStorage)
  const url = util.getSlotsUrl(
    id,
    startDateObj,
    endDateObj,
    slotTimeFieldFormat
  )
  console.log(url)

  // const [response, setResponse] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(false)
  // useEffect(() => {
  //   setLoading(true)
  //   fetch(url, {})
  //     .then((res) => {
  //       console.log(res.data)
  //       setResponse(res.data)
  //       setLoading(false)
  //     })
  //     .catch(() => {
  //       setError(true)
  //       setLoading(false)
  //     })
  // }, [url])

  const { data, loading, error = [] } = useFetch(url, {})
  // console.log(url, data)

  if (error && globalError === false) {
    setGlobalLoading(false)
    setGlobalError(true)
  }
  if (loading && globalLoading === false) {
    setGlobalLoading(true)
  }
  if (data && typeof data.slots !== 'undefined') {
    if (globalLoading === true) {
      setGlobalLoading(false)
    }
    return data
  }
  return true
}

/**
 *
 * @param {Object} data
 * @param {String} prop
 */
util.getSlotsDataValue = (data, prop) => {
  if (typeof data === 'undefined') return null
  return typeof data.hasOwnProperty(prop) ? data[prop] : null
}

util.isSlotSelected = (id, selectedSlots) => {
  return typeof selectedSlots[id] !== 'undefined'
}
