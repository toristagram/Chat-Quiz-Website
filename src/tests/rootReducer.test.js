import rootReducer from '../redux/reducers/rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      data: null,
      loading: false,
      error: null,
    };
    
    const action = { type: 'UNKNOWN_ACTION' };
    const nextState = rootReducer(undefined, action);
    
    expect(nextState).toEqual(initialState);
  });
  
  it('should handle FETCH_DATA_REQUEST action', () => {
    const initialState = {
      data: null,
      loading: false,
      error: null,
    };
    
    const action = { type: 'FETCH_DATA_REQUEST' };
    const nextState = rootReducer(initialState, action);
    
    expect(nextState.loading).toBe(true);
    expect(nextState.data).toBeNull();
    expect(nextState.error).toBeNull();
  });
  
  it('should handle FETCH_DATA_SUCCESS action', () => {
    const initialState = {
      data: null,
      loading: false,
      error: null,
    };
    
    const mockData = { id: 1, name: 'Example' };
    const action = { type: 'FETCH_DATA_SUCCESS', payload: mockData };
    const nextState = rootReducer(initialState, action);
    
    expect(nextState.loading).toBe(false);
    expect(nextState.data).toEqual(mockData);
    expect(nextState.error).toBeNull();
  });
  
  it('should handle FETCH_DATA_ERROR action', () => {
    const initialState = {
      data: null,
      loading: false,
      error: null,
    };
    
    const mockError = 'Something went wrong';
    const action = { type: 'FETCH_DATA_ERROR', payload: mockError };
    const nextState = rootReducer(initialState, action);
    
    expect(nextState.loading).toBe(false);
    expect(nextState.data).toBeNull();
    expect(nextState.error).toEqual(mockError);
  });
});