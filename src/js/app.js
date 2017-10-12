// import Packages
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router'
import { syncHistoryWithStore, routerReducer, push } from 'react-router-redux'

// import Store
import store from "store"

// import LayOut
import LayOut from 'LayOut'

// import Pages
import Home from 'Home'
import Register from 'Register'
import Login from 'Login'
import ForgotPassword from 'ForgotPassword'

// DOM
const app = document.getElementById('app');

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// renderDOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={ history }>
      <Route path='/' component={LayOut}>
        <IndexRoute component={Home} />
        <Route path='register' component={Register} />
        <Route path='login' component={Login} />
        <Route path='forgot-password' component={ForgotPassword} />
      </Route>
    </Router>
  </Provider>
  , app);
