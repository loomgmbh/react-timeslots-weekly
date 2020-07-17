import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import Calendar from './components/Calendar.jsx';

const Root = () => {
  
  let startDateInputProps = {
    class: 'some-random-class',
    name: 'monday',
}
  return (
    <>
      <Calendar
        firstDay = {moment().day("Monday")}
        initialDate = { moment().format() }
        timeslots = { [
            ['9', '10'],
            ['10', '11'],
            ['18'],
        ] }
        timeslotProps = {{
          format: 'H', // Each element in the timeslot array is an Hour
          showFormat: 'H:mm',
        }}
        startDateInputProps = {startDateInputProps}
        locale = 'de'
      />
    </>
  )
}

render(<Root/>, document.querySelector('#product-booking-calendar-target'))
