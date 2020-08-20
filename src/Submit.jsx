import React, { useState, useContext, useEffect } from 'react'
// import { useRouter } from 'state'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Context } from './Store'
import util from './utility'

const Submit = () => {
  const location = useLocation()
  console.log(location)
  const [state] = useContext(Context)
  const { apiData, selectedBookings, query, formats, client, status } = state
  const { apiPostUrl, productId } = query
  const { classRoot } = formats
  const { fingerprint, ipData } = client

  console.log(location)

  // just run the effect on pathname and/or search change
  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0)
    }
  }, [location])

  const handleClick = () => {
    util.postApiData(apiPostUrl, {
      selected: selectedBookings,
      productId,
    })
    window.location.reload(`${window.location.href}#success`)
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const classRootMod = `${classRoot}--submit`
  return (
    <div className={classRootMod}>
      <button
        type="submit"
        className={`button button--${classRootMod}`}
        name="submit"
        disabled={util.submitIsDisabled(status, selectedBookings, apiData)}
        onClick={handleClick}
      >
        Termin buchen
      </button>
    </div>
  )
}

export default Submit
