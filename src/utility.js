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

util.getDaysOfWeek = (dateObj, daySteps = 7) => {
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
    dispatch({ type: 'ADD_SELECTED_BOOKING', payload: slot })
  } else {
    dispatch({ type: 'REMOVE_SELECTED_BOOKING', payload: value })
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

util.getApiData = (apiUrl, status, dispatch) => {
  const { state, error, data } = util.useApi(apiUrl)
  return { ...data, ...{ status: state }, ...{ error } }
}

util.useApi = (url) => {
  const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  }

  const [data, setData] = React.useState({
    state: apiStates.LOADING,
    error: '',
    data: [],
  })

  const setPartData = (partialData) => setData({ ...data, ...partialData })

  React.useEffect(() => {
    setPartData({
      state: apiStates.LOADING,
    })
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPartData({
          state: apiStates.SUCCESS,
          data,
        })
      })
      .catch(() => {
        setPartData({
          state: apiStates.ERROR,
          error: 'fetch failed',
        })
      })
  }, [url])

  return data
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
