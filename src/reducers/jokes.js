import { createReducer } from 'redux-act'
import { updateData } from '../actions'

/** --------------------------------------------------
 *
 * Reducers
 *
 */

const sampleInitialState = {
  commentText: '',
  item: {},
  items: [],
  isShow: false,
  isSort: false,
  selectedId: -1,
  selectedvalue: ''
}

export const sampleReducer = {
  [updateData]: (state, payload) => ({
    ...state,
    ...payload
  }),
  ['USER_LOGOUT']: () => sampleInitialState
}

export default createReducer(sampleReducer, sampleInitialState)
