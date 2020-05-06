import { createAction } from 'redux-act'

// Actions
export const onLikeAction = createAction('LIKE_ACTION')

// Redux logic actions

// Login
export const LOGIN_ACTION = 'LOGIN_ACTION'
export const login = createAction(LOGIN_ACTION)
export const USER_REGISTRATION = 'USER_REGISTRATION'
export const register = createAction(USER_REGISTRATION)
export const UPDATE_AUTH_DATA = 'UPDATE_AUTH_DATA'
export const updateAuthData = createAction(UPDATE_AUTH_DATA)

// Profile
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const updateProfile = createAction('UPDATE_PROFILE')
export const userLogout = createAction('USER_LOGOUT')

// error
export const updateError = createAction('UPDATE_ERROR')

// fetch the joke data
export const GET_JOKE = 'GET_JOKE'
export const getJoke = createAction(GET_JOKE)
export const updateData = createAction('UPDATE_DATA')

// update joke status
export const LIKE_ACTION = 'LIKE_ACTION'
export const UPDATE_LIKE = 'UPDATE_LIKE'
export const updateJoke = createAction(UPDATE_LIKE)

// Get all jokes
export const GET_JOKES = 'GET_JOKES'
export const getJokes = createAction(GET_JOKES)

// Delete jokes
export const DELETE_JOKES = 'DELETE_JOKES'
export const deleteJoke = createAction(DELETE_JOKES)
export const DELETE_SELECTED_JOKES = 'DELETE_SELECTED_JOKES'
export const deleteSelectedJoke = createAction(DELETE_SELECTED_JOKES)

// update comments
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const updateComment = createAction(UPDATE_COMMENTS)

// get comments
export const GET_COMMENTS = 'GET_COMMENTS'
export const getComments = createAction(GET_COMMENTS)

// Delete jokes
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const deleteComment = createAction(DELETE_COMMENT)
