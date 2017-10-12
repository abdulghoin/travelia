import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import app from 'appReducer'
import users from 'usersReducer'
import travels from 'travelsReducer'

export default combineReducers({
  app,
  users,
  travels,
  routing : routerReducer,
})
