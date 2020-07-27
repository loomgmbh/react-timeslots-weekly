import React from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import moment from 'moment'
import useFetch from 'use-http'

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

util.getDays = (dateObj, daySteps) => {
  const days = []
  for (let i = 0; i < daySteps; i++) {
    days.push(moment(dateObj).add(i, 'days'))
  }
  return days
}

util.getSlotsUrl = (id) => {
  return (
    process.env.REACT_APP_BASE_URL +
    process.env.REACT_APP_API_BOOKINGS_ENDPOINT +
    id
  )
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

util.getSlots = (
  id,
  startDateObj,
  endDateObj,
  globalLoading,
  setGlobalLoading,
  globalError,
  setGlobalError
) => {
  // const [bookings] = useLocalStorage('bookings')
  console.log(localStorage)
  const url = util.getSlotsUrl(id)
  const options = {
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  }
  const { loading, error, data = [] } = useFetch(url, options, [])

  if (error && globalError === false) {
    setGlobalError(true)
  }
  if (loading && globalLoading === false) {
    setGlobalLoading(true)
  }
  if (data.slots) {
    if (globalLoading === true) {
      setGlobalLoading(false)
    }
    return data
  }
  return true
}

util.getSlotsDataValue = (data, prop) => {
  if (typeof data === 'undefined') return null
  return typeof data.hasOwnProperty(prop) ? data[prop] : null
}

util.isSlotSelected = (id, selectedSlots) => {
  return typeof selectedSlots[id] !== 'undefined'
}
