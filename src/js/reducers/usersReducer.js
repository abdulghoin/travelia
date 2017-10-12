export default function reducer(state={
    user : null,
    fetching : false,
    fetched : false,
    error : null,
  }, action) {

  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        fetching : true,
        user : null,
        fetched : false,
        error : null,
      }
    }
    break;
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        fetched : true,
        fetching : false,
        error : null,
        user : action.payload,
      }
    }
    break;
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        user : null,
        fetching : false,
        fetched : true,
        error : action.payload,
      }
    }
    break;
  }

  return state
}
