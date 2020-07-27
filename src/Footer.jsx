import React from 'react'
import util from './utility'

const Footer = (props) => {
  const { selectedSlots, classRoot } = props

  const classRootMod = `${classRoot}--footer`
  return (
    <div className={classRootMod}>
      <h5>{Object.keys(selectedSlots).length} selected</h5>
      {Object.entries(selectedSlots).map(([key, value]) => {
        const date = util.getDate(key)
        return <div key={date.format('x')}>{date.format('D. MM, H.mm')}</div>
      })}
    </div>
  )
}

export default Footer
