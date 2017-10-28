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
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
      if (remember_me) {
        dispatch({type: 'KEEP_ME_LOGGED_IN', payload: res.data.access_token})
      }
      window.alert('login sukses')
    })
    .catch((err)=>{
      dispatch({type: 'LOGIN_FAILED', payload: err.response})
      dispatch(push('/login'))
    })
  }
}

export function verify() {
  let url = `${API_URL}users/verify?access_token=${localStorage.getItem('access_token')}`

  return(dispatch)=>{
    return axios.post(url)
    .then(res=>{
      dispatch({type: 'LOGIN_SUCCESS'})
    })
    .catch(err=>{
      dispatch({type: 'LOGIN_FAILED', payload: null})
      dispatch(push('/login'))
    })
  }
}

export function register(first_name, last_name, email, password) {
  let url = `${API_URL}users`

  return(dispatch)=>{
    return axios.post(url, {
      first_name,
      last_name,
      email,
      password
    })
    .then(res=>{
      dispatch(push('/login'))
    })
    .catch(err=>{
      return Promise.reject(err.response)
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
