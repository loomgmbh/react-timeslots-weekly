import React, { useContext } from 'react'
import { Context } from './Store'

const Title = () => {
  const [state] = useContext(Context)
  const { query, formats } = state
  const { classRoot, dateTitleStartProps, dateTitleEndProps } = formats
  const classRootMod = `${classRoot}--title`
  const { weekNumber, startDay, endDay } = query

  return (
    <div className={classRootMod}>
      <h4>
        <span className={`${classRootMod}__calendar-week`}>
          KW: {weekNumber},{' '}
        </span>
        <span>
          {startDay.format(dateTitleStartProps)}{' '}
          {endDay.format(dateTitleEndProps)}
        </span>
      </h4>
    </div>
  )
}

export default Title
