const Reducer = (state, action) => {
  const {apiData, selectedBookings} = state
  switch (action.type) {
    case 'UPDATE_API_DATA':
      const {bookings, slots, apiUrl} = action.payload
      const thisData = {}
      thisData[apiUrl] = {bookings, slots}
      const newCache = {...apiData, ...thisData}
      return {
        ...state,
        apiData: newCache,
      }

    case 'SET_CLIENT':
      return {
        ...state,
        client: action.payload,
      }

    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload,
      }

    case 'SET_TIMESLOTS':
      return {
        ...state,
        timeslots: action.payload,
      }

    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      }

    case 'SET_BOOKINGS':
      return {
        ...state,
        openBookings: action.payload,
      }
    // case 'ADD_BOOKING':
    //   const booking = action.payload.start ?? null
    //   openBookings[booking] = action.payload
    //   return {
    //     ...state,
    //     openBookings: openBookings,
    //   }
    // case 'REMOVE_BOOKING':
    //   // const { selectedBookings } = state
    //   delete openBookings[action.payload]
    //   return {
    //     ...state,
    //     openBookings,
    //   }

      case 'SET_SELECTED_BOOKINGS':
      return {
        ...state,
        selectedBookings: action.payload,
      }
    case 'ADD_SELECTED_BOOKING':
      const selected_booking = action.payload.start ?? null
      selectedBookings[selected_booking] = action.payload
      return {
        ...state,
        selectedBookings: selectedBookings,
        // selectedBookings: state.selectedBookings.concat(action.payload),
      }
    case 'REMOVE_SELECTED_BOOKING':
      // const { selectedBookings } = state
      delete selectedBookings[action.payload]
      return {
        ...state,
        selectedBookings,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Reducer
