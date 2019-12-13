import { combineReducers } from 'redux'
import name from './User'
import messages from './Messages'

export default combineReducers({
  name,
  messages,
})
