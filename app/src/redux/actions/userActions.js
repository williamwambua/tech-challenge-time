import ApiService from '../../services/ApiService';
import history from '../../components/history';

const loginUserRequest = () => ({
  type: 'LOGIN_USER_REQUEST'
})

const loginUserSuccess = (data) => ({
  type: 'LOGIN_USER_SUCCESS',
  data
})

const loginUserFailure = (error) => ({
  type: 'LOGIN_USER_FAILURE',
  error
})

const registerUserRequest = () => ({
  type: 'REGISTER_USER_REQUEST'
})

const registerUserSuccess = (data) => ({
  type: 'REGISTER_USER_SUCCESS',
  data
})

const registerUserFailure = (error) => ({
  type: 'REGISTER_USER_FAILURE',
  error
})

export const loginUser = (params, props) => async dispatch => {
  try {
    dispatch(loginUserRequest());
    const data = await ApiService.loginUser(params);
      try {
        const token = data.jwt.replace('Bearer ', '');
        const { cookies } = props;
        
        setCookies(data, cookies, token);
        dispatch(loginUserSuccess(data));
        history.push('/sessions');
      } catch (e) {
        if (!data) {
          dispatch(loginUserFailure({
            response: {
              status: 404,
              statusText: 'Account does not exist'
            } 
          }));
        }
        else {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      }
  } catch (error) {
    dispatch(loginUserFailure(error));
  }
}

const setCookies = (data, cookies, token) => {
  let expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 30);

  cookies.set('auth-token', token, { path: '/', expires: expiry });
  cookies.set('name', data.name, { path: '/', expires: expiry });
  cookies.set('email', data.email, { path: '/', expires: expiry });
  cookies.set('userId', data.id, { path: '/', expires: expiry });
}

export const registerUser = (params, props) => async dispatch => {
  try {
    dispatch(registerUserRequest());
    const data = await ApiService.registerUser(params);
      try {
        const token = data.jwt.replace('Bearer ', '');
        const { cookies } = props;

        setCookies(data, cookies, token)

        dispatch(registerUserSuccess(data));
        history.push('/sessions');
      } catch (e) {
        dispatch(registerUserFailure({
          response: {
            statusText: e
          }
        }));
      }
  } catch (error) {
    dispatch(registerUserFailure(error));
  }
}

export const reloadUser = (params) => async dispatch => {
  dispatch(loginUserSuccess(params));
}