import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// firebase
import firebase from '../firebase'
import '@firebase/firestore'
// actions
import { addName } from '../actions/User'
import { getMessages, sendMessage } from '../actions/Messages'
// models
import { MainProps } from '../models'
// lib
import moment from 'moment'
import 'moment/locale/ja'

interface State extends MainProps{}

export const useApp = () => {
  // date
  const created_at = new Date()

  // state
  const [loading, setLoading] = useState(false)
  const [Name, setName] = useState('')
  const [content, setContent] = useState('...loading')
  const [messages, setMessages] = useState([{
    name: Name,
    content: content,
    created_at: firebase.firestore.Timestamp.fromDate(new Date())
  }])

  // selector
  const name = useSelector((state: State) => state.name)

  // dispatch
  const dispatch = useDispatch()

  // db real time
  const collection = useMemo(() => {
    const db = firebase.firestore().collection("messages").orderBy('created_at', 'desc')
    db.onSnapshot(query => {
      const data: any =[]
      query.forEach((d => data.push({ ...d.data(), docId: d.id })))
      setMessages(data)
    })
    return db
  }, [])

  // getApp
  const getApp = useCallback(async () => {
    setLoading(true)
    try {
      dispatch(getMessages())
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }, [dispatch])

  // post message
  const postMessage = () => {
    setLoading(true)
    try {
      dispatch(sendMessage(name, content, created_at))
      const input = document.getElementById("content") as HTMLInputElement
      input.value = ''
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  // add name
  const onSubmit = () => {
    dispatch(addName(Name))
  }

  // time
  const renderTime = (time: any) => {
    moment.locale("ja")
    return moment(time).fromNow()
  }

  return {
    messages,
    getApp,
    onSubmit,
    content,
    name,
    Name,
    setName,
    collection,
    setContent,
    postMessage,
    renderTime,
    loading,
  }
}
