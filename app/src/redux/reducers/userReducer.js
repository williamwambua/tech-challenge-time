const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_REQUEST':
      return {
        ...state
      }    
    case 'LOGIN_USER_SUCCESS':
      return {
          ...state,
          user: action.data
      }
    case 'LOGIN_USER_FAILURE':
      return {
        ...state,
        status: action.error.response.status,
        statusText: action.error.response.statusText
      }
      case 'REGISTER_USER_REQUEST':
        return {
          ...state
        }    
      case 'REGISTER_USER_SUCCESS':
        return {
            ...state,
            user: action.data,
            status: null,
            statusText: null
        }
      case 'REGISTER_USER_FAILURE':
        return {
          ...state,
          status: action.error.response.status,
          statusText: action.error.response.statusText
        }
      case 'LOGOUT_USER':
      return {
        ...state,
        user: {}
      }
    default:
      return state
  }
};

export default userReducer;