import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx'
import Controls from './Controls.jsx'
import Week from './Week.jsx'
import Footer from './Footer.jsx'
import { useAsyncTask, useAsyncRun } from 'react-hooks-async';
import util from './utility.js'
  
const Booking = props => {
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
  
  const [, setSlots] = useState([])
  const slotsData = util.getSlots(id, startDay, endDay)

  const [selectedSlots, setSelectedSlots] = useState([])

  const handleSlotClick = (date, selected) => {
    if (selected) {
      selectedSlots[date] = {
        start: date,
        end: '@todo',
        duration: '@todo',
      }
    }
    else {
      delete selectedSlots[date]
    }
    // const newSelected = selectedSlots
    setSelectedSlots(selectedSlots)
    
    console.log(selectedSlots)
  }

  console.log(selectedSlots)
  console.log(selectedSlots.length)
  
  return (
    <div className = {classRoot}>
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
      <Week 
        days={days} 
        dayTitleStartProps={dayTitleStartProps}
        dayTitleEndProps={dayTitleEndProps}
        slots={slotsData}
        setSlots={setSlots}
        slotTimeFormat={slotTimeFormat}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        handleSlotClick={handleSlotClick}
        classRoot={classRoot}
      />
      <Footer
        selectedSlots = {selectedSlots}
        classRoot = {classRoot}
      />
    </div>
  );
}

export default Booking
