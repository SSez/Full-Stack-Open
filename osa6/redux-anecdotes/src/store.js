import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anedcoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anedcoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))