import { combineReducers } from 'redux'
import name from './User'
import messages from './Messages'
import { reducer as form } from 'redux-form'

export default combineReducers({
  name,
  messages,
  form: form,
})
