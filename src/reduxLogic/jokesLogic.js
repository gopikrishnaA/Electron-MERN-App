import { createLogic } from 'redux-logic'
import * as Actions from '../actions'
import invokeService from '../services'
import { getJokesParser } from '../parsers/jsonParser'
import { push } from 'connected-react-router'

const getJoke = createLogic({
  type: Actions.GET_JOKE, // only apply this logic to this type
  latest: true, // only take latest
  process ({ action }, dispatch, done) {
    invokeService({
      serviceUrl: action.payload ?
                  `/api/jokes/${action.payload}`
                  : '/api/joke',
      method: 'GET'
    })
      .then((result) => {
        if (action.payload) {
          dispatch(push(`/joke/${action.payload}`))
        } else {
          if (result?.data) {
            dispatch(Actions.updateData({ item: result.data }));
            dispatch(push('/home'))
          }
        }
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      })
      .then(() => done())
  }
})

const updateLikes = createLogic({
  type: Actions.UPDATE_LIKE, // only apply this logic to this type
  process ({ action }, dispatch, done) {
    if (action.payload.route === 'home') {
      const requestData = {
        status: action.payload.status
      }
      invokeService({
        serviceUrl: `/api/jokes/${action.payload.id}`,
        method: 'PUT',
        requestData
      })
        .then(() => {
          dispatch(Actions.getJoke())
        })
        .catch((err) => {
          console.error(err) // log since could be render err
        })
        .then(() => done())
    } else {
      const requestData = {
        id: action.payload.id,
        joke: action.payload.joke,
        status: action.payload.status
      }
      invokeService({
        serviceUrl: '/api/jokes',
        method: 'POST',
        requestData
      })
        .then(() => {
          dispatch(Actions.getJoke())
        })
        .catch((err) => {
          console.error(err) // log since could be render err
        })
        .then(() => done())
    }
  }
})

const getItems = createLogic({
  type: Actions.GET_JOKES, // only apply this logic to this type
  process ({ }, dispatch, done) {
    invokeService({
      serviceUrl: '/api/jokes'
    })
      .then((res) => {
        dispatch(Actions.updateData({ items: getJokesParser(res.data) }))
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  }
})

const deleteJokes = createLogic({
  type: Actions.DELETE_JOKES, // only apply this logic to this type
  process ({ action }, dispatch, done) {
    invokeService({
      serviceUrl: `/api/jokes/${action.payload}`,
      method: 'DELETE'
    })
      .then(() => {
        dispatch(Actions.getJokes())
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  }
})

const deleteSelectedJokes = createLogic({
  type: Actions.DELETE_SELECTED_JOKES, // only apply this logic to this type
  process ({ action }, dispatch, done) {
    const requestData = {
      items: action.payload
    }
    invokeService({
      serviceUrl: 'api/jokes/delete',
      method: 'POST',
      requestData
    })
      .then(() => {
        dispatch(Actions.getJokes())
      })
      .catch((err) => {
        console.error(err) // log since could be render err
      })
      .then(() => done())
  }
})

export default [
  deleteJokes,
  deleteSelectedJokes,
  getItems,
  getJoke,
  updateLikes
]
