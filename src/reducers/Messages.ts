import { GET_MESSAGES } from '../actions/Messages'

export default (messages = [], action: any) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.data
    default:
      return messages
  }
}
