import {production} from 'baseURL'

import { applyMiddleware, createStore } from 'redux'

// import logger from 'redux-logger'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'

import reducer from 'reducers'

let middleware = null

if (production) {
  middleware = applyMiddleware(promise(), thunk, routerMiddleware(browserHistory))
} else {
  middleware = applyMiddleware(promise(), thunk, createLogger(), routerMiddleware(browserHistory))
}

export default createStore(reducer, middleware)
