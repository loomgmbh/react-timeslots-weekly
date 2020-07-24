import React from 'react';

import { render } from 'react-dom';
import moment from 'moment';
// import Calendar from './components/Calendar.jsx';
import Booking from './Calendar.jsx';
import './styles.scss'

const Root = () => {
  
  let startDateInputProps = {
    class: 'some-random-class',
    name: 'monday',
}
  return (
    <>
      {/*<Calendar
        classRoot = 'booking-calendar'
        firstDay = 'monday'
        initialDate = { moment().format() }
        timeslots = { [
            ['9', '10'],
            ['10', '11'],
            ['18'],
        ] }
        timeslotProps = {{
          format: 'H', // Each element in the timeslot array is an Hour
          showFormat: 'H.mm',
        }}
        startDateInputProps = {startDateInputProps}
        locale = 'de'
      />*/}
      <Booking
        classRoot = 'booking-calendar'
        firstDay = 'monday'
        initialDate = { moment().format() }
        timeslotProps = {{
          format: 'H', // Each element in the timeslot array is an Hour
          showFormat: 'H.mm',
        }}
        dateTitleStartProps = {'D. MMMM –'}
        dateTitleEndProps = {'D. MMMM Y'}
        dayTitleStartProps = {'dd'}
        dayTitleEndProps = {'D.'}
        slotTimeFormat = {'H.mm'}
        locale = 'de'
      />
    </>
  )
}

render(<Root/>, document.querySelector('#product-booking-calendar-target'))
