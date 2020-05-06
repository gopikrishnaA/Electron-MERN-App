import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loading from './loading'
import jokes from './jokes'
import auth from './auth'
import error from './error'

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    loading,
    auth,
    jokes,
    error
  })

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
