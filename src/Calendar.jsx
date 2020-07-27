import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useAsyncTask, useAsyncRun } from 'react-hooks-async'
import Store, { Context } from './Store'
import Header from './Header'
import Controls from './Controls'
import Week from './Week'
import Footer from './Footer'
import util from './utility'

const Calendar = (props) => {
  const [state, dispatch] = useContext(Context)

  const {
    classRoot,
    initialDate,
    dateTitleStartProps,
    dateTitleEndProps,
    dayTitleStartProps,
    dayTitleEndProps,
    slotTimeFormat,
  } = props

  const daySteps = 7
  const id = util.getProductId()
  const curDate = util.getDate(initialDate)
  const [startDay, setStartDay] = useState(util.getStartDay(curDate))
  const [endDay, setEndDay] = useState(util.getEndDay(startDay))
  const weekNumberRef = util.getWeekNumber(curDate)
  const [weekNumber, setWeekNumber] = useState(weekNumberRef)
  const [days, setDays] = useState(util.getDays(startDay, daySteps))
  const [globalLoading, setGlobalLoading] = useState(false)

  const [, setSlots] = useState([])
  const data = util.getSlots(
    id,
    startDay,
    endDay,
    globalLoading,
    setGlobalLoading
  )

  const [selectedSlots, setSelectedSlots] = useState([])

  const handleSlotClick = (date, selected) => {
    if (selected) {
      selectedSlots[date] = {
        start: date,
        end: '@todo',
        duration: '@todo',
      }
    } else {
      delete selectedSlots[date]
    }
    // const newSelected = selectedSlots
    setSelectedSlots(selectedSlots)
  }

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
      {globalLoading && (
        <div className={`${classRoot}--loading loading`}>Loading...</div>
      )}
      <Week
        days={days}
        dayTitleStartProps={dayTitleStartProps}
        dayTitleEndProps={dayTitleEndProps}
        slotsData={data}
        setSlots={setSlots}
        slotTimeFormat={slotTimeFormat}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        handleSlotClick={handleSlotClick}
        classRoot={classRoot}
      />
      <Footer selectedSlots={selectedSlots} classRoot={classRoot} />
    </div>
  )
}

export default Calendar
