import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from './Store'
import util from './utility'

const Submit = () => {
  const [state] = useContext(Context)
  const { selectedBookings, query, formats, client, status } = state
  const { apiPostUrl, productId } = query
  const { classRoot } = formats
  const { fingerprint, ipData } = client

  const handleClick = () => {
    util.postApiData(apiPostUrl, {
      selected: selectedBookings,
      fingerprint,
      ipData,
      productId,
    })
  }

  const classRootMod = `${classRoot}--submit`
  return (
    <div className={classRootMod}>
      <button
        type="submit"
        className={`btn btn--${classRootMod}`}
        name="submit"
        disabled={
          util.isDisabled(status) ||
          !util.hasSelection(selectedBookings) ||
          ipData === null
        }
        onClick={handleClick}
      >
        Termin buchen
      </button>
    </div>
  )
}

export default Submit
