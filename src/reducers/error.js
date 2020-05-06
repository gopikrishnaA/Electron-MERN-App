const initialState = {
  showError: false,
  errorMessage: '',
  variant: 'danger'
};
const errorReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'UPDATE_ERROR':
        const data = action.payload || initialState;
        return {
          ...state,
          ...data
      }
      case 'USER_LOGOUT': return initialState
      default: return state
  }
};

export default errorReducer;
