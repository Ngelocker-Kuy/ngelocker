import { combineReducers } from 'redux'
import usersReducers from './users'
import adminReducers from './admin'
import guestReducers from './guest'
import lockerReducers from './locker'

export default combineReducers({
  usersReducers,
  adminReducers,
  guestReducers,
  lockerReducers
})
