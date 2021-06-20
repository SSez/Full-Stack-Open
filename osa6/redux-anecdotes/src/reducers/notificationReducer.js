let timeoutID

export const setNotification = (content, time) => {
    clearTimeout(timeoutID);
    return async dispatch => {
      timeoutID = setTimeout(() => {
        dispatch({ type: "RESET_NOTIFICATION" })
      }, time * 1000)
      dispatch({ type: "SET_NOTIFICATION", content })
    }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default reducer