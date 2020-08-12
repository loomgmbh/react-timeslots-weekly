import React from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import moment from 'moment'
import fp from 'fingerprintjs2'

const util = {}
export default util

util.getProductId = () => {
  if (util.isDevelopment()) return 201
  if (!(typeof drupalSettings === 'undefined')) {
    return drupalSettings.bookingCalendar.productId
  }
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

util.updateBookings = (selected, selectedStart, selectedEnd, dispatch) => {
  if (selected) {
    const slot = {
      start: selectedStart,
      end: selectedEnd,
    }
    dispatch({ type: 'ADD_SELECTED_BOOKING', payload: slot })
  } else {
    dispatch({ type: 'REMOVE_SELECTED_BOOKING', payload: selectedStart })
  }
}

util.getSlotsUrl = (id, startDateObj, endDateObj, slotTimeFieldFormat, offset = null) => {

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

util.doPrefetch = (startDay, endDay, productId, slotTimeFieldFormat) => {
  const newStart = startDay.clone().add(1, 'week')
  const newEnd = startDay.clone().add(1, 'week')
  const getMoreUrl = util.getSlotsUrl(productId, newStart, newEnd, slotTimeFieldFormat)
  const moreData = util.getApiData(getMoreUrl)
  console.log(getMoreUrl)
  console.log(moreData)
}

util.getApiData = (url, cache = {}) => {
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
    const thisData = cache[url] || null
    if (thisData) {
      setPartData({
        status: apiStates.SUCCESS,
        data: thisData,
      })
    }
    else {
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
    }
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

util.cleanData = (f) => {
  for (const key in f) {
    if (f[key] === null || f[key] === undefined || f[key] instanceof Error) {
      delete f[key]
    }
    if (Array.isArray(f[key])) {
      f[key] = f[key].join(', ')
    }
    if (
      (typeof f[key] === 'string' || f[key] instanceof String) &&
      f[key].length === 0
    ) {
      delete f[key]
    }
    if (typeof f[key] === 'boolean') {
      f[key] = `${f[key]}`
    }
  }

  return f
}

util.getFingerprint = () =>
  new Promise((resolve) => {
    fp.get((components) => {
      resolve(components)
    })
  })

util.getClientData = () => {
  const [fingerprint, setFingerprint] = React.useState(null)
  const [ipData, setIpData] = React.useState(null)
  const [showReport, setShowReport] = React.useState(true)

  React.useEffect(() => {
    if (showReport) {
      fetch('https://extreme-ip-lookup.com/json')
        .then((res) => res.json())
        .then((ip) => Promise.all([ip, util.getFingerprint()]))
        .then(([ip, finger]) => {
          let f = finger
            .map(({ key, value }) => ({ [key]: value }))
            .reduce((acc, curr) => ({
              ...acc,
              ...curr,
            }))

          f = util.cleanData(f)
          ip = util.cleanData(ip)

          setFingerprint(f)
          setIpData(ip)
          setShowReport(false)
        })
    }
  }, [showReport])
  return { fingerprint, ipData }
}

util.getIp = (ipData) => {
  if (ipData === null) return null
  if (typeof ipData === 'undefined') return null
  const { query } = ipData
  return query
}

util.isDevelopment = () => {
  return process.env.NODE_ENV === 'development'
}

util.submitIsDisabled = (status, selectedBookings, ipData) => {
  return (
    util.isDisabled(status) ||
    !util.hasSelection(selectedBookings) ||
    ipData === null
  )
}