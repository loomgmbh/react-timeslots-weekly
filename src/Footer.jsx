import React from 'react'
import util from './utility'

const Footer = (props) => {
  const { selectedSlots, footerSelectedTimeFormat, classRoot } = props

  const classRootMod = `${classRoot}--footer`
  const selectedCount = Object.keys(selectedSlots).length
  return (
    selectedCount > 0 && (
      <div className={classRootMod}>
        <h5>{Object.keys(selectedSlots).length} selected</h5>
        {Object.entries(selectedSlots).map(([key, value]) => {
          const date = util.getDate(key)
          return (
            <div key={date.format('x')}>
              {date.format(footerSelectedTimeFormat)}
            </div>
          )
        })}
      </div>
    )
  )
}

export default Footer
