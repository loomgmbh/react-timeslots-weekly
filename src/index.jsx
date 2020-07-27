import React from 'react'

import { render } from 'react-dom'
import moment from 'moment'
import Store from './Store'
import Calendar from './Calendar.jsx'
import './styles.scss'

const Root = () => {
  const startDateInputProps = {
    class: 'some-random-class',
    name: 'monday',
  }
  return (
    <Store>
      <Calendar
        classRoot="booking-calendar"
        firstDay="monday"
        initialDate={moment().startOf('day')}
        timeslotProps={{
          format: 'H', // Each element in the timeslot array is an Hour
          showFormat: 'H.mm',
        }}
        dateTitleStartProps="D. MMMM –"
        dateTitleEndProps="D. MMMM Y"
        dayTitleStartProps="dd"
        dayTitleEndProps="D."
        slotTimeFormat="H.mm"
        slotTimeFieldFormat="YYYY-MM-DDTHH:mm:ss"
        locale="de"
      />
    </Store>
  )
}

render(<Root />, document.querySelector('#product-booking-calendar-target'))
