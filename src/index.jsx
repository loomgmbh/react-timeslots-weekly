import React from 'react'

import { render } from 'react-dom'
import Store from './Store'
import Calendar from './Calendar'
import './styles.scss'

const Root = () => {
  return (
    <Store>
      <Calendar />
    </Store>
  )
}

render(<Root />, document.querySelector('#product-booking-calendar-target'))
