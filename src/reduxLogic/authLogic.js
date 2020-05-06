import { createLogic } from 'redux-logic'
import { push } from 'react-router-redux'
import {
  LOGIN_ACTION,
  USER_REGISTRATION,
  UPDATE_PROFILE,
  updateAuthData,
  getJoke,
  updateError
} from '../actions'
import invokeService from '../services'

const loginLogic = createLogic({
  type: LOGIN_ACTION, // only apply this logic to this type
  latest: true, // only take latest
  process ({ action }, dispatch, done) {
    const { email, password } = action.payload;
    const requestData = {
      email,
      password
    }
    invokeService({
      serviceUrl: '/api/user/login',
      method: 'POST',
      requestData
    })
      .then((result) => {
        if (result) {
          dispatch(updateAuthData({
            userId: result?.userId,
            userToken: result?.token || '',
            email: result?.email,
            userName: result?.userName,
            avatar: result?.avatar,
            password,
            isSigned: true
          }))
          dispatch(getJoke())
        }
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  }
})

const registerLogic = createLogic({
  type: USER_REGISTRATION,
  latest: true,
  process ({ action }, dispatch, done) {
    const {
      email,
      username,
      password,
      password2 } = action.payload
    const requestData = {
      name: username,
      email,
      password,
      password2
    }
    invokeService({
      serviceUrl: '/api/user/registration',
      method: 'POST',
      requestData
    })
      .then((result) => {
        const isSuccess = result?.status === 'success';
        isSuccess && dispatch(push('/login'))
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => done())
  }
})

const updateProfileLogic = createLogic({
  type: UPDATE_PROFILE,
  latest: true,
  process ({ action }, dispatch, done) {
    const {
      avatar = '',
      email,
      username,
      password,
      password2,
      userId } = action.payload;
    const requestData = {
      avatar,
      name: username,
      email,
      password,
      password2,
      userId
    };
    invokeService({
      serviceUrl: '/api/user/update',
      method: 'POST',
      requestData
    })
      .then((result) => {
        const isSuccess = result?.status === 'success';
        if (isSuccess) {
            dispatch(updateAuthData({
            userId: result?.userId,
            email: result?.email,
            userName: result?.userName,
            avatar: result?.avatar,
            password
          }));
          dispatch(updateError({
            showError: true,
            errorMessage: 'User profile updated successfully',
            variant: 'success'
          }))
        }
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      })
      .then(() => done())
  }
})

export default [
  loginLogic,
  registerLogic,
  updateProfileLogic
]
