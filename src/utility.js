import React from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import moment from 'moment'

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

util.postSlotsUrl = (id) => {
  return (
    process.env.REACT_APP_BASE_URL +
    process.env.REACT_APP_API_POST_ENDPOINT +
    id
  )
}

util.postApiData = (url, data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }
  fetch(url, options)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
    })
    .catch((error) => {
      console.log(error)
    })
}

util.getApiData = (url) => {
  const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  }
  const [apiData, setApiData] = React.useState({
    status: apiStates.LOADING,
    error: '',
    data: [],
  })

  const setPartData = (partialData) =>
    setApiData({ ...apiData, ...partialData })

  React.useEffect(() => {
    setPartData({
      status: apiStates.LOADING,
    })
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        setPartData({
          status: apiStates.SUCCESS,
          data: responseData,
        })
      })
      .catch(() => {
        setPartData({
          status: apiStates.ERROR,
          error: 'fetch failed',
        })
      })
  }, [url])
  const { status, error, ...other } = apiData
  const { data } = other
  const merge = { status, error, ...data }
  return merge
}

util.isSlotSelected = (id, selectedSlots) => {
  return typeof selectedSlots[id] !== 'undefined'
}

util.isDisabled = (status) => {
  if (!status) {
    return false
  }
  return status !== 'SUCCESS'
}

util.hasSelection = (selectedBookings) => {
  if (!selectedBookings) {
    return false
  }

  return Object.keys(selectedBookings).length > 0
}
