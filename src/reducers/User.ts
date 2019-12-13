import { ADD_NAME } from '../actions/User'

export default (name = '', action: any) => {
  switch (action.type) {
    case ADD_NAME:
      name = action.name
      return name
    default:
      return name
  }
}
