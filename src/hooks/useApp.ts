import {useCallback, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../firebase'
import '@firebase/firestore'
// actions
import { addName } from '../actions/User'
import { getMessages, sendMessage } from '../actions/Messages'
// models
import { MainProps } from '../models'

interface State extends MainProps{}

export const useApp = () => {
  // date
  const created_at = new Date()
  // state
  const [Name, setName] = useState('TestUser')
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState([{
    name: Name,
    content: '',
    created_at: firebase.firestore.Timestamp.fromDate(new Date())
  }])
  // selector
  const name = useSelector((state: State) => state.name)
  // dispatch
  const dispatch = useDispatch()

  const collection = useMemo(() => {
    const db = firebase.firestore().collection("messages").orderBy('created_at', 'desc')
    db.onSnapshot(query => {
      const data: any =[]
      query.forEach((d => data.push({ ...d.data(), docId: d.id })))
      setMessages(data)
    })
    return db
  }, [])

  const getApp = useCallback(async () => {
    try {
      dispatch(getMessages())
    } catch (e) {
      console.log(e)
    }
  }, [dispatch])

  const postMessage = () => {
    try {
      dispatch(sendMessage(name, content, created_at))
      const input = document.getElementById("content") as HTMLInputElement
      input.value = ''
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = () => {
    dispatch(addName(Name))
  }

  return { messages, getApp, onSubmit, content, name, Name, setName, collection, setContent, postMessage }
}
