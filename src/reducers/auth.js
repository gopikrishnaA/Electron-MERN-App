const initialState = {
  userToken: '',
  userName: '',
  email: '',
  avatar: '',
  isSigned: false
};
const authReducer = (state = initialState, action) => {
  switch(action.type) {
      case 'UPDATE_AUTH_DATA':
        const data = action.payload || initialState;
        return {
          ...state,
          ...data
      }
      case 'USER_LOGOUT': return initialState
      default: return state
  }
};

export default authReducer;
