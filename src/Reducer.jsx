const Reducer = (state, action) => {
  const {bookings} = state
  // const value = action.payload.start ?? null
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
      }
    case 'ADD_BOOKING':
      const value = action.payload.start ?? null
      bookings[value] = action.payload
      return {
        ...state,
        bookings: bookings,
        // bookings: state.bookings.concat(action.payload),
      }
    case 'REMOVE_BOOKING':
      // const { bookings } = state
      delete bookings[action.payload]
      return {
        ...state,
        bookings,
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
