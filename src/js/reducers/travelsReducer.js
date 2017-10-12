export default function reducer(state={
    travels : null,
    fetching : false,
    fetched : false,
    error : null,
  }, action) {

  switch (action.type) {
    case 'GET_TRAVELS': {
      return {
        ...state,
        fetching : true,
        travels : null,
        fetched : false,
        error : null,
      }
    }
    break;
    case 'GET_TRAVELS_SUCCESS': {
      return {
        ...state,
        fetched : true,
        fetching : false,
        error : null,
        travels : action.payload,
      }
    }
    break;
    case 'GET_TRAVELS_FAILED': {
      return {
        ...state,
        travels : null,
        fetching : false,
        fetched : true,
        error : action.payload,
      }
    }
    break;
    case 'UPDATE_TRAVELS_SUCCESS': {
      return {
        ...state,
        travels : action.payload,
        fetching : false,
        fetched : true,
        error : null,
      }
    }
    break;
  }

  return state
}
