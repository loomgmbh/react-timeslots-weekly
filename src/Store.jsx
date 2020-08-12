import React, { createContext, useReducer } from 'react'
import moment from 'moment'
import Reducer from './Reducer'
import util from './utility'

const locale = 'de'

const formats = {
  classRoot: 'booking-calendar',
  firstDay: 'monday',
  initialDate: moment().startOf('day'),
  daySteps: '7',
  dateTitleStartProps: 'D. MMMM –',
  dateTitleEndProps: 'D. MMMM Y',
  dayTitleStartProps: 'dd',
  dayTitleEndProps: 'D.',
  slotTimeFormat: 'H.mm',
  slotTimeFieldFormat: 'YYYY-MM-DDTHH:mm:ss',
  footerSelectedTimeFormat: 'D. MM, H.mm',
  locale,
}
const productId = util.getProductId()
const curDate = util.getDate(null, locale)
const startDay = util.getStartDay(curDate)
const endDay = util.getEndDay(startDay)
const apiUrl = util.getSlotsUrl(
  productId,
  startDay,
  endDay,
  formats.slotTimeFieldFormat
)
const apiPostUrl = util.postSlotsUrl(productId)
const query = {
  apiUrl,
  apiPostUrl,
  productId,
  curDate,
  startDay,
  endDay,
  currentWeekNumber: util.getWeekNumber(curDate),
  weekNumber: util.getWeekNumber(curDate),
  daysOfWeek: util.getDaysOfWeek(startDay),
  daySteps: 7,
}

const initialState = {
  openBookings: {},
  timeslots: [],
  apiData: {},
  selectedBookings: {},
  query,
  formats,
  client: {},
  status: null,
  error: null,
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export const Context = createContext(initialState)
export default Store
