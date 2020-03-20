import { combineReducers } from 'redux'
import usersReducers from './users'
import adminReducers from './admin'
import guestReducers from './guest'

export default combineReducers({
  usersReducers,
  adminReducers,
  guestReducers
})
