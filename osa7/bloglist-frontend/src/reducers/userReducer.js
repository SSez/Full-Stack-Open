import loginService from '../services/login'
import storage from '../utils/storage'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const initializeUser = (user) => {
  return {
    type: 'INIT_USER',
    data: user
  }
}

export const login = (auth) => {
  return async (dispatch) => {
    const response = await loginService.login(auth)
    storage.saveUser(response)
    dispatch({
      type: 'LOGIN',
      data: response
    })
  }
}

export const logout = () => {
  return async (dispatch) => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer