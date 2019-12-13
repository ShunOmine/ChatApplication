import firebase from '../firebase'
import '@firebase/firestore'

export const GET_MESSAGES = 'GET_MESSAGES'

const db = firebase.firestore()
const messages = db.collection("messages")

export const getMessages = () => async (dispatch: Function) => {
  const response = await messages.get()
  const data: any = []
  response.docs.map(doc => (
    data.push(doc.data())
  ))
  console.log(data)

  dispatch({ type: GET_MESSAGES, data })
}
