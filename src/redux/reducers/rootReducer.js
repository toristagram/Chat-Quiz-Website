const initialState = {
    data: null,
    loading: false,
    error: null,
    score: 0,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_DATA_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_DATA_ERROR':
        return { ...state, loading: false, error: action.payload };
      case 'CHANGE_SCORE':
        return { ...state, loading: false, score: action.payload };

      default:
        return state;
    }
  };
  
  export default rootReducer;