import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx'
import Controls from './Controls.jsx'
import Week from './Week.jsx'
import { useAsyncTask, useAsyncRun } from 'react-hooks-async';
import util from './utility.js'
  
const Booking = props => {
  const {
    classRoot, 
    firstDay, 
    initialDate, 
    timeslotProps, 
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
  
  return (
    <div className = {classRoot}>
      <Header
        days = {days}
        weekNumber = {weekNumber}
        startDay = {startDay}
        endDay = {endDay}
        dateTitleStartProps = {dateTitleStartProps}
        dateTitleEndProps = {dateTitleEndProps}
        classRoot = {classRoot}
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
        classRoot={classRoot} 
        dayTitleStartProps={dayTitleStartProps}
        dayTitleEndProps={dayTitleEndProps}
        slots={slotsData}
        setSlots={setSlots}
        slotTimeFormat={slotTimeFormat}
      />
    </div>
  );
}

export default Booking
