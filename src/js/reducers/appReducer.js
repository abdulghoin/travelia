export default function reducer(state={
    access_token : null,
  }, action) {

  switch (action.type) {
    case 'KEEP_ME_LOGGED_IN': {
      localStorage.setItem('access_token', action.payload)
      return {
        ...state,
        access_token : action.payload
      }
    }
    break;
    case 'LOGIN_FAILED': {
      localStorage.removeItem('access_token')
      return {
        ...state,
        access_token : null
      }
    }
    break;
  }

  return state
}
