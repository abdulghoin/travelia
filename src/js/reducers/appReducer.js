export default function reducer(state={
    reports : [],
    fetching : false,
    fetched : false,
    error : null,
  }, action) {

  switch (action.type) {
    case 'GET_REPORT': {
      return {
        ...state,
        fetching : true,
        reports : [],
        fetched : false,
        error : null,
      }
    }
    break;
    case 'GET_REPORT_SUCCESS': {
      return {
        ...state,
        fetched : true,
        fetching : false,
        error : null,
        reports : action.payload,
      }
    }
    break;
    case 'GET_REPORT_FAILED': {
      return {
        ...state,
        reports : [],
        fetching : false,
        fetched : true,
        error : action.payload,
      }
    }
    break;
  }

  return state
}
