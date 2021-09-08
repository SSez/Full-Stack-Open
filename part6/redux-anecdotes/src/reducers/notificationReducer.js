let timeoutID

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (content, time) => {
    clearTimeout(timeoutID)
    return async dispatch => {
      timeoutID = setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, time * 1000)
      dispatch({ type: "SET_NOTIFICATION", content })
    }
}

export default reducer