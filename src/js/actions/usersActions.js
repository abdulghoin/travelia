// import Packages
import axios from 'axios'
import {push} from 'react-router-redux'
import {API_URL} from 'baseURL'

export function login(email, password, remember_me) {
  let url = `${API_URL}users/login`

  return(dispatch)=>{
    return axios.post(url, {
      email,
      password
    })
    .then((res)=>{
      console.log(res);
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
      if (remember_me) {
        dispatch({type: 'KEEP_ME_LOGGED_IN', payload: res.data.access_token})
      }
      return Promise.resolve(true)
    })
    .catch((err)=>{
      dispatch({type: 'LOGIN_FAILED', payload: err.response})
      dispatch(push('/login'))
      return Promise.reject(false)
    })
  }
}

export function verify() {
  let url = `${API_URL}users/verify?access_token=${localStorage.getItem('access_token')}`

  return(dispatch)=>{
    return axios.post(url)
    .then((res)=>{
      console.log(res);
      dispatch({type: 'LOGIN_SUCCESS'})
      return Promise.resolve(true)
    })
    .catch((err)=>{
      dispatch({type: 'LOGIN_FAILED', payload: null})
      dispatch(push('/login'))
      return Promise.reject(false)
    })
  }
}

export function register(first_name, last_name, mail, password) {
  let url = `${API_URL}users/`

  return(dispatch)=>{
    return axios.post(url, {
      first_name,
      last_name,
      email,
      password
    })
    .then((res)=>{
      console.log(res);
      return Promise.resolve(true)
    })
    .catch((err)=>{
      console.error(err);
      return Promise.reject(false)
    })
  }
}

export function forgotPassword(email) {
  let url = `${API_URL}users/forgot-password`

  return(dispatch)=>{
    return axios.post(url, {email})
    .then((res)=>{
      console.log(res);
      return Promise.resolve(true)
    })
    .catch((err)=>{
      console.error(err);
      return Promise.reject(false)
    })
  }
}
