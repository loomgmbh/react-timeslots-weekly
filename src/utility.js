import React from 'react';
import moment from 'moment';
import useFetch from 'use-http'

let util = {};
export default util;

util.getProductId = () => {
  return ('dev')
    ? 201 
    : drupalSettings.bookingCalendar.productId
}

util.getDate = (initialDate, locale = process.env.REACT_APP_LOCALE) => {
  if (initialDate) {
    return moment(initialDate).locale(locale)
  }
  else {
    return moment().locale(locale)
  }
}

util.getWeekNumber = dateObj => {
  return dateObj.isoWeek()
}

util.getStartDay = dateObj => {
  return dateObj.clone().startOf('isoWeek');
}

util.getEndDay = dateObj => {
  return dateObj.clone().endOf('isoWeek');
}

util.getDays = (dateObj, daySteps) => {
  var days = [];
  for (var i = 0; i < daySteps; i++) {
    days.push(moment(dateObj).add(i, 'days'));
  }
  return days
}

util.getSlotsUrl = (id) => {
  return process.env.REACT_APP_BASE_URL
    + process.env.REACT_APP_API_BOOKINGS_ENDPOINT
    + id
}

util.getSlotsForDay = (day, slots) => {
  const index = day.format('Y-MM-DD')
  if (!slots) return
  return slots[index] ?? null
}

util.updateSlots = (selected, value, selectedSlots, setSelectedSlots) => {
  if (selected) {
    selectedSlots[value] = {
      start: value,
      end: '@todo',
      duration: '@todo',
    }
  }
  else {
    delete selectedSlots[value]
  }
  const newSelected = selectedSlots
  setSelectedSlots(newSelected)
  
  console.log(selectedSlots)
}

util.getSlots = (id, startDateObj, endDateObj, globalLoading, setGlobalLoading) => {

  const url = util.getSlotsUrl(id)
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const { loading, error, data = [] } = useFetch(url, options, [])
  // if (error) return error
  if (loading && globalLoading == false) setGlobalLoading(true)
  // if (typeof data.slots !== 'undefined' && data.slots.length > 0) {
  if (data.slots) {
    if (globalLoading == true) setGlobalLoading(false)
    return data.slots
  }
}
  
util.isSlotSelected = (id, selectedSlots) => {
  return typeof selectedSlots[id] != 'undefined'
}