import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarJS from 'calendarjs'
import Calendar from 'react-calendar';
import * as util from './utility.js'


const Title = props => {
  const {
    days, 
    weekNumber, 
    startDay, 
    endDay, 
    dateTitleStartProps, 
    dateTitleEndProps, 
    classRoot
  } = props
    
  const classRootMod = `${classRoot}--title`
  return (
    <div className = {classRootMod}>
      <h4>KW: {weekNumber}</h4>
      <h4>{startDay.format(dateTitleStartProps)} {endDay.format(dateTitleEndProps)}</h4>
    </div>
  );
}

export default Title
