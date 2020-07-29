import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { writeStorage } from '@rehooks/local-storage'
import Store, { Context } from './Store'
import Header from './Header'
import Controls from './Controls'
import Week from './Week'
import Footer from './Footer'
import util from './utility'

const Calendar = (props) => {
  const {
    classRoot,
    initialDate,
    daySteps,
    dateTitleStartProps,
    dateTitleEndProps,
    dayTitleStartProps,
    dayTitleEndProps,
    slotTimeFormat,
    slotTimeFieldFormat,
    footerSelectedTimeFormat,
  } = props

  const [state, dispatch] = useContext(Context)
  useEffect(() => {
    dispatch({ type: 'SET_BOOKINGS', payload: {} })
  }, [])
  const { bookings } = state
  writeStorage('bookings', bookings)

  const id = util.getProductId()
  const curDate = util.getDate(initialDate)
  const [startDay, setStartDay] = useState(util.getStartDay(curDate))
  const [endDay, setEndDay] = useState(util.getEndDay(startDay))
  const weekNumberRef = util.getWeekNumber(curDate)
  const [weekNumber, setWeekNumber] = useState(weekNumberRef)
  const [days, setDays] = useState(util.getDays(startDay, daySteps))
  const [globalLoading, setGlobalLoading] = useState(false)
  const [globalError, setGlobalError] = useState(false)

  // const [, setSlots] = useState([])

  const data = util.getSlots(
    id,
    startDay,
    endDay,
    globalLoading,
    setGlobalLoading,
    globalError,
    setGlobalError
  )

  return (
    <div className={classRoot}>
      <Header
        weekNumber={weekNumber}
        startDay={startDay}
        endDay={endDay}
        dateTitleStartProps={dateTitleStartProps}
        dateTitleEndProps={dateTitleEndProps}
        classRoot={classRoot}
      />
      <Controls
        weekNumber={weekNumber}
        weekNumberRef={weekNumberRef}
        setWeekNumber={setWeekNumber}
        startDay={startDay}
        setStartDay={setStartDay}
        setEndDay={setEndDay}
        daySteps={daySteps}
        setDays={setDays}
        classRoot={classRoot}
      />
      <div className={`${classRoot}--content-wrapper`}>
        {globalLoading && (
          <div className={`${classRoot}--loading loading`}>
            <h3>Loading...</h3>
          </div>
        )}
        {globalError ? (
          <div className={`${classRoot}--error error`}>
            <h3>There was an error.</h3>
          </div>
        ) : (
          <Week
            days={days}
            dayTitleStartProps={dayTitleStartProps}
            dayTitleEndProps={dayTitleEndProps}
            slotsData={data}
            // setSlots={setSlots}
            slotTimeFormat={slotTimeFormat}
            // selectedSlots={selectedSlots}
            // handleSlotClick={handleSlotClick}
            slotTimeFieldFormat={slotTimeFieldFormat}
            classRoot={classRoot}
          />
        )}
        <Footer
          selectedSlots={bookings}
          footerSelectedTimeFormat={footerSelectedTimeFormat}
          classRoot={classRoot}
        />
      </div>
    </div>
  )
}

export default Calendar
