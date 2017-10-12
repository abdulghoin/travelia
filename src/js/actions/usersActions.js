// import Packages
import axios from 'axios'
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
      return Promise.resolve(true)
    })
    .catch((err)=>{
      console.error(err);
      return Promise.reject(false)
    })
  }
}

export function verify(token) {
  let url = `${API_URL}users/verify`

  return(dispatch)=>{
    return axios.post(url, {token})
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
