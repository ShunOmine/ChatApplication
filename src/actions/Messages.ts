import firebase from '../firebase'
import '@firebase/firestore'

export const GET_MESSAGES = 'GET_MESSAGES'
export const SEND_MESSAGE = 'SEND_MESSAGE'

const db = firebase.firestore()
const messages = db.collection("messages")

export const getMessages = () => async (dispatch: Function) => {
  const response = await messages.get()
  const data: any = []
  response.docs.map(doc => (
    data.push(doc.data())
  ))
  dispatch({ type: GET_MESSAGES, data })
}

export const sendMessage = (name: string, content: string, created_at: any) => async (dispatch: Function) => {
  const response = await messages.add({
    content: content,
    created_at: created_at,
    name: name,
  })
  dispatch({ type: SEND_MESSAGE, response })
}
