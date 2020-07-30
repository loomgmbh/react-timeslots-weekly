const Reducer = (state, action) => {
  const {selectedBookings} = state
  // const value = action.payload.start ?? null
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        selectedBookings: action.payload,
      }
    case 'ADD_BOOKING':
      const value = action.payload.start ?? null
      selectedBookings[value] = action.payload
      return {
        ...state,
        selectedBookings: selectedBookings,
        // selectedBookings: state.selectedBookings.concat(action.payload),
      }
    case 'REMOVE_BOOKING':
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
